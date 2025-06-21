<?php

namespace App\Database;

use PDO;
use PDOException;

class Database {
    private string $host;
    private string $user;
    private string $pass;
    private string $name;
    private string $charset;
    private ?PDO $pdo = null;


    public function __construct() {
        $this->host = getenv('MYSQL_HOST'); //container name
        $this->user = getenv('MYSQL_USER');
        $this->pass = getenv('MYSQL_PASSWORD');
        $this->name = getenv('MYSQL_DATABASE');
        $this->charset = 'utf8mb4';
        $this->connect();
    }
    private function connect(): void {
        try {
            // Use the correct DSN format with port and proper MySQL parameters
            $dsn = "mysql:host={$this->host};dbname={$this->name};charset={$this->charset}";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_PERSISTENT => false,
            ];
            $this->pdo = new PDO($dsn, $this->user, $this->pass, $options);
        }
        catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function getConnection(): ?PDO {
        return $this->pdo;
    }
}
