<?php

namespace App\TypeDefinitions;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeSetType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeSet',
            'description' => 'A set of product attributes',
            'fields' => [
                'name' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The name of the attribute set (e.g., Size, Color)',
                ],
                'type' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The type of attribute set (text or swatch)',
                ],
                'values' => [
                    'type' => Type::listOf(Type::string()),
                    'description' => 'The available values for this attribute set',
                ]
            ]
        ]);
    }
}
