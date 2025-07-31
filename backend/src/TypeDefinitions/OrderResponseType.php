<?php

namespace App\TypeDefinitions;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderResponseType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderResponse',
            'description' => 'Response from order creation',
            'fields' => [
                'order_id' => [
                    'type' => Type::nonNull(Type::int()),
                    'description' => 'The created order ID'
                ],
                'status' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'Status of the order creation'
                ],
                'total_cost' => [
                    'type' => Type::float(),
                    'description' => 'Total cost of the order'
                ]
            ]
        ]);
    }
}
