<?php

namespace App\TypeDefinitions;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItemInput',
            'description' => 'Input for order item',
            'fields' => [
                'product_id' => ['type' => Type::nonNull(Type::string())],
                'quantity' => ['type' => Type::nonNull(Type::int())],
                'attributes' => ['type' => Type::listOf(TypesRegistry::type(OrderItemAttributeInputType::class))],
            ]
        ]);
    }
}
