<?php

require_once __DIR__ . '/../vendor/autoload.php';
use App\Database\Database;

// Simple CORS - allow all origins (or use environment variable)
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    return;
}

$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    $r->post('/graphql', [App\Controller\GraphQL::class, 'handle']);
});

$routeInfo = $dispatcher->dispatch(
    $_SERVER['REQUEST_METHOD'],
    $_SERVER['REQUEST_URI']
);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo json_encode(['error' => '404 Not Found', 'path' => $_SERVER['REQUEST_URI'], 'method' => $_SERVER['REQUEST_METHOD']]);
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        $allowedMethods = $routeInfo[1];
        echo json_encode(['error' => '405 Method Not Allowed', 'allowed_methods' => $allowedMethods]);
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        echo $handler($vars);
        break;
}
