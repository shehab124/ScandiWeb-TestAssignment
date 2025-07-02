<?php

namespace App\TypeDefinitions;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;


class PriceType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Price',
            'description' => 'Product price information',
            'fields' => [
                'amount' => [
                    'type' => Type::nonNull(Type::float()),
                    'description' => 'The price amount',
                ],
                'currency' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The currency code (e.g., USD)',
                ],
                'symbol' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The currency symbol (e.g., $)',
                ]
            ]
        ]);
    }
}
