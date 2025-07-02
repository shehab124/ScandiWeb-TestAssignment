<?php

namespace App\TypeDefinitions;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class GalleryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'GalleryImage',
            'description' => 'A product gallery image',
            'fields' => [
                'id' => [
                    'type' => Type::nonNull(Type::id()),
                    'description' => 'The unique identifier of the image',
                ],
                'url' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The URL of the image',
                    'resolve' => function($image) {
                        return $image['image_url'];
                    }
                ],
                'order' => [
                    'type' => Type::int(),
                    'description' => 'The display order of the image',
                    'resolve' => function($image) {
                        return $image['display_order'];
                    }
                ]
            ]
        ]);
    }
}
