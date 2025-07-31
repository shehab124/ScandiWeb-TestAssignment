<?php

namespace App\TypeDefinitions;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemAttributeInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItemAttributeInput',
            'description' => 'Input for order item attribute',
            'fields' => [
                'attribute_id' => ['type' => Type::nonNull(Type::int())],
            ]
        ]);
    }
}
