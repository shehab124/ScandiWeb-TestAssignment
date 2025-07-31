<?php

namespace App\Model;

use App\Model\BaseModel;

class AttributeSetModel extends BaseModel
{
    protected string $table = 'attribute_sets';

    public function __construct()
    {
        parent::__construct();
    }

    public function getByProductId(string $productId): array
    {
        return $this->qb
            ->andWhere('product_id', '=', $productId)
            ->orderBy('id')
            ->getAll();
    }

    public function getAll(): array
    {
        return $this->qb
            ->orderBy('id')
            ->getAll();
    }
}
