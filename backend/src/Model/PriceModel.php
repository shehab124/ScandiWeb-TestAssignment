<?php

namespace App\Model;

use App\Model\BaseModel;

class PriceModel extends BaseModel
{
    protected string $table = 'prices';

    public function __construct()
    {
        parent::__construct();
    }

    public function getByProductId(string $productId): array
    {
        return $this->qb
            ->andWhere('product_id', '=', $productId)
            ->get();
    }
}
