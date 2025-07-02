<?php

namespace App\Service;

use Monolog\Logger as MonologLogger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Formatter\LineFormatter;
use Monolog\Processor\IntrospectionProcessor;
use Monolog\Processor\WebProcessor;

class Logger
{
    private static ?MonologLogger $instance = null;

    public static function getInstance(): MonologLogger
    {
        if (self::$instance === null) {
            self::$instance = self::createLogger();
        }

        return self::$instance;
    }

    private static function createLogger(): MonologLogger
    {
        $logger = new MonologLogger('graphql-app');

        // Create logs directory if it doesn't exist
        $logsDir = __DIR__ . '/../../logs';
        if (!is_dir($logsDir)) {
            mkdir($logsDir, 0755, true);
        }

        // Rotating file handler for all logs
        $rotatingHandler = new RotatingFileHandler(
            $logsDir . '/app.log',
            30, // Keep 30 days of logs
            MonologLogger::DEBUG
        );

        // Custom formatter with timestamp, level, and message
        $formatter = new LineFormatter(
            "[%datetime%] %channel%.%level_name%: %message% %context% %extra%\n",
            'Y-m-d H:i:s'
        );
        $rotatingHandler->setFormatter($formatter);

        // Add processors for extra context
        $logger->pushProcessor(new IntrospectionProcessor());
        $logger->pushProcessor(new WebProcessor());

        $logger->pushHandler($rotatingHandler);

        // Also log errors to a separate file
        $errorHandler = new StreamHandler(
            $logsDir . '/error.log',
            MonologLogger::ERROR
        );
        $errorHandler->setFormatter($formatter);
        $logger->pushHandler($errorHandler);

        return $logger;
    }
}
