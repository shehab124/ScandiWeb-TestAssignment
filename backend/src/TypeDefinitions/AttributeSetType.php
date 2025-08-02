<?php

namespace App\TypeDefinitions;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\TypeDefinitions\AttributeType;
use App\TypeDefinitions\TypesRegistry;

class AttributeSetType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeSet',
            'description' => 'A set of product attributes',
            'fields' => [
                'id' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'Id of the attribute set'
                ],
                'name' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The name of the attribute set (e.g., Size, Color)',
                ],
                'type' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The type of attribute set (text or swatch)',
                ],
                'attributes' => [
                    'type' => Type::listOf(TypesRegistry::type(AttributeType::class)),
                    'description' => 'The attributes in the attribute set',
                ]
            ]
        ]);
    }
}
