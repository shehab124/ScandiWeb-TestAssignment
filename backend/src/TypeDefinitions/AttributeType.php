<?php

namespace App\TypeDefinitions;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Attribute',
            'description' => 'An attribute of a product',
            'fields' => [
                'id' => [
                    'type' => Type::nonNull(Type::int()),
                    'description' => 'Id of the attribute'
                ],
                'attributeSetId' => [
                    'type' => Type::nonNull(Type::int()),
                    'description' => 'Id of the attribute set'
                ],
                'displayValue' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The display value of the attribute'
                ],
                'value' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The value of the attribute'
                ]
            ]
        ]);
    }
}
