<?php

namespace App\Model;

use App\Model\ModelInterface;
use App\Database\QueryBuilder;

class ProductGalleryModel implements ModelInterface
{
    private QueryBuilder $qb;

    public function __construct()
    {
        $this->qb = new QueryBuilder();
    }

    public function get(string $id)
    {
        return $this->qb
            ->from('product_gallery')
            ->andWhere('id', '=', $id)
            ->get();
    }

    public function getByProductId(string $productId)
    {
        return $this->qb
            ->from('product_gallery')
            ->andWhere('product_id', '=', $productId)
            ->orderBy('display_order')
            ->getAll();
    }

    public function getAll()
    {
        return $this->qb
            ->from('product_gallery')
            ->orderBy('display_order')
            ->getAll();
    }

    public function delete(string $id)
    {
        return $this->qb
            ->from('product_gallery')
            ->andWhere('id', '=', $id)
            ->delete();
    }

    public function update(string $id, array $data)
    {
        return $this->qb
            ->from('product_gallery')
            ->andWhere('id', '=', $id)
            ->update($data);
    }

    public function insert(array $data)
    {
        return $this->qb
            ->from('product_gallery')
            ->insert($data);
    }

    public function rawQuery(string $sql, array $data = [])
    {
        return $this->qb->rawQuery($sql, $data);
    }
}
