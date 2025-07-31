<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;
use App\TypeDefinitions\TypesRegistry;
use App\Model\CategoryModel;
use App\Model\ProductModel;
use App\Model\OrderModel;
use App\TypeDefinitions\CategoryType;
use App\TypeDefinitions\ProductType;
use App\TypeDefinitions\OrderItemInputType;
use App\TypeDefinitions\OrderItemAttributeInputType;
use App\TypeDefinitions\OrderResponseType;
use App\Service\Logger;
use App\Service\OrderService;

class GraphQL {
    static public function handle() {
        $logger = Logger::getInstance();

        try {
            $logger->info('GraphQL request started');

            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'category' => [
                        'type' => TypesRegistry::type(CategoryType::class),
                        'description' => 'Get a category by ID',
                        'args' => [
                            'id' => [
                                'type' => Type::nonNull(Type::string()),
                                'description' => 'The category ID'
                            ]
                        ],
                        'resolve' => static function ($rootValue, array $args) use ($logger) {
                            $logger->info('Resolving category by ID', ['id' => $args['id']]);
                            try {
                                $categoryModel = new CategoryModel();
                                $result = $categoryModel->get($args['id']);
                                $logger->info('Category resolved successfully', ['id' => $args['id'], 'result' => $result]);
                                return $result;
                            } catch (\Exception $e) {
                                $logger->error('Error resolving category', ['id' => $args['id'], 'error' => $e->getMessage()]);
                                throw $e;
                            }
                        },
                    ],
                    'categories' => [
                        'type' => Type::listOf(TypesRegistry::type(CategoryType::class)),
                        'description' => 'Get all categories',
                        'resolve' => static function ($rootValue, array $args) use ($logger): array {
                            $logger->info('Resolving all categories');
                            try {
                                $categoryModel = new CategoryModel();
                                $categories = $categoryModel->getAll();
                                $logger->info('Categories resolved successfully', ['count' => count($categories)]);
                                return $categories;
                            } catch (\Exception $e) {
                                $logger->error('Error resolving categories', ['error' => $e->getMessage()]);
                                throw $e;
                            }
                        },
                    ],
                    'products' => [
                        'type' => Type::listOf(TypesRegistry::type(ProductType::class)),
                        'description' => 'Get all products',
                        'resolve' => static function ($rootValue, array $args) use ($logger): array {
                            $logger->info('Resolving all products');
                            try {
                                $productModel = new ProductModel();
                                $products = $productModel->getAll();
                                $logger->info('Products resolved successfully', ['count' => count($products)]);
                                return $products;
                            } catch (\Exception $e) {
                                $logger->error('Error resolving products', ['error' => $e->getMessage()]);
                                throw $e;
                            }
                        },
                    ],
                    'product' => [
                        'type' => TypesRegistry::type(ProductType::class),
                        'description' => 'Get a product by ID',
                        'args' => [
                            'id' => [
                                'type' => Type::nonNull(Type::string()),
                                'description' => 'The product ID'
                            ]
                        ],
                        'resolve' => static function ($rootValue, array $args) use ($logger) {
                            $logger->info('Resolving product by ID', ['id' => $args['id']]);
                            try {
                                $productModel = new ProductModel();
                                $result = $productModel->get($args['id']);
                                $logger->info('Product resolved successfully', ['id' => $args['id']]);
                                return $result;
                            } catch (\Exception $e) {
                                $logger->error('Error resolving product', ['id' => $args['id'], 'error' => $e->getMessage()]);
                                throw $e;
                            }
                        },
                    ],
                    'productsByCategory' => [
                        'type' => Type::listOf(TypesRegistry::type(ProductType::class)),
                        'description' => 'Get products by category name',
                        'args' => [
                            'category' => [
                                'type' => Type::nonNull(Type::string()),
                                'description' => 'The category name'
                            ]
                        ],
                        'resolve' => static function ($rootValue, array $args) use ($logger): array {
                            $logger->info('Resolving products by category', ['category' => $args['category']]);
                            try {
                                $productModel = new ProductModel();
                                $products = $productModel->getByCategory($args['category']);
                                $logger->info('Products by category resolved successfully', ['category' => $args['category'], 'count' => count($products)]);
                                return $products;
                            } catch (\Exception $e) {
                                $logger->error('Error resolving products by category', ['category' => $args['category'], 'error' => $e->getMessage()]);
                                throw $e;
                            }
                        },
                    ]
                ],
            ]);

            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'createOrder' => [
                        'type' => TypesRegistry::type(OrderResponseType::class),
                        'description' => 'Create a new order',
                        'args' => [
                            'items' => ['type' => Type::nonNull(Type::listOf(TypesRegistry::type(OrderItemInputType::class)))],
                            'total_cost' => ['type' => Type::nonNull(Type::float())],
                            'currency_label' => ['type' => Type::nonNull(Type::string())],
                            'currency_symbol' => ['type' => Type::nonNull(Type::string())],
                            'attributes' => ['type' => Type::listOf(TypesRegistry::type(OrderItemAttributeInputType::class))]
                        ],
                        'resolve' => static function ($rootValue, array $args) use ($logger): array {
                            $logger->info('Creating new order', ['items_count' => count($args['items'])]);
                            try {
                                $orderService = new OrderService();
                                $orderId = $orderService->createOrder($args);
                                $logger->info('Order created successfully', ['id' => $orderId]);
                                return [
                                    'order_id' => $orderId,
                                    'status' => $orderId > 0 ? 'success' : 'failed',
                                    'total_cost' => $args['total_cost']
                                ];
                            } catch (\Exception $e) {
                                $logger->error('Error creating order', ['error' => $e->getMessage()]);
                                throw $e;
                            }
                        },
                    ],
                ],
            ]);

            // See docs on schema options:
            // https://webonyx.github.io/graphql-php/schema-definition/#configuration-options
            $schema = new Schema(
                (new SchemaConfig())
                ->setQuery($queryType)
                ->setMutation($mutationType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $logger->info('Executing GraphQL query', [
                'query' => $query,
                'variables' => $variableValues
            ]);

            $rootValue = ['prefix' => 'You said: '];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();

            if (!empty($result->errors)) {
                $logger->error('GraphQL execution errors', ['errors' => $result->errors]);
            } else {
                $logger->info('GraphQL query executed successfully');
            }

        } catch (Throwable $e) {
            $logger->error('GraphQL execution failed', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}
