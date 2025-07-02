<?php

namespace App\TypeDefinitions;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Model\ProductGalleryModel;
use App\Model\AttributeSetModel;
use App\Model\AttributeModel;
use App\TypeDefinitions\TypesRegistry;
use App\TypeDefinitions\CategoryType;
use App\TypeDefinitions\PriceType;
use App\TypeDefinitions\GalleryType;
use App\TypeDefinitions\AttributeSetType;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'description' => 'A product in the store',
            'fields' => [
                'id' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The unique identifier of the product',
                ],
                'name' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'The name of the product',
                ],
                'inStock' => [
                    'type' => Type::boolean(),
                    'description' => 'Whether the product is in stock',
                ],
                'description' => [
                    'type' => Type::string(),
                    'description' => 'The description of the product',
                ],
                'brand' => [
                    'type' => Type::string(),
                    'description' => 'The brand of the product',
                ],
                'category' => [
                    'type' => TypesRegistry::type(CategoryType::class),
                    'description' => 'The category of the product',
                    'resolve' => function($product) {
                        return [
                            'id' => $product['category_id'],
                            'name' => $product['category_name']
                        ];
                    }
                ],
                'price' => [
                    'type' => TypesRegistry::type(PriceType::class),
                    'description' => 'The price of the product',
                    'resolve' => function($product) {
                        return [
                            'amount' => $product['price'],
                            'currency' => $product['currency_label'],
                            'symbol' => $product['currency_symbol']
                        ];
                    }
                ],
                'gallery' => [
                    'type' => Type::listOf(TypesRegistry::type(GalleryType::class)),
                    'description' => 'The product gallery images',
                    'resolve' => function($product) {
                        $galleryModel = new ProductGalleryModel();
                        return $galleryModel->getByProductId($product['id']);
                    }
                ],
                'attributes' => [
                    'type' => Type::listOf(TypesRegistry::type(AttributeSetType::class)),
                    'description' => 'The product attributes',
                    'resolve' => function($product) {
                        $attributeSetModel = new AttributeSetModel();
                        $attributeModel = new AttributeModel();

                        $attributeSets = $attributeSetModel->getByProductId($product['id']);
                        $grouped = [];

                        foreach ($attributeSets as $set) {
                            $attributes = $attributeModel->getByAttributeSetId($set['id']);
                            $values = array_column($attributes, 'display_value');

                            $grouped[] = [
                                'name' => $set['name'],
                                'type' => $set['type'],
                                'values' => $values
                            ];
                        }

                        return $grouped;
                    }
                ]
            ]
        ]);
    }
}
