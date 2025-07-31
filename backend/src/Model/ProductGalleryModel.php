<?php

namespace App\Model;

use App\Model\BaseModel;

class ProductGalleryModel extends BaseModel
{
    protected string $table = 'product_gallery';

    public function __construct()
    {
        parent::__construct();
    }

    public function getByProductId(string $productId): array
    {
        return $this->qb
            ->andWhere('product_id', '=', $productId)
            ->orderBy('display_order')
            ->getAll();
    }

    public function getAll(): array
    {
        return $this->qb
            ->orderBy('display_order')
            ->getAll();
    }

    public function update(string $id, array $data): int
    {
        return $this->qb
            ->andWhere('id', '=', $id)
            ->update($data);
    }
}
