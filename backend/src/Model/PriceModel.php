<?php

namespace App\Model;

use App\Model\ModelInterface;
use App\Database\QueryBuilder;

class PriceModel implements ModelInterface
{
    private QueryBuilder $qb;

    public function __construct()
    {
        $this->qb = new QueryBuilder();
    }

    public function get(string $id)
    {
        return $this->qb
            ->from('prices')
            ->andWhere('id', '=', $id)
            ->get();
    }

    public function getByProductId(string $productId)
    {
        return $this->qb
            ->from('prices')
            ->andWhere('product_id', '=', $productId)
            ->get();
    }

    public function getAll()
    {
        return $this->qb
            ->from('prices')
            ->getAll();
    }

    public function delete(string $id)
    {
        return $this->qb
            ->from('prices')
            ->andWhere('id', '=', $id)
            ->delete();
    }

    public function update(string $id, array $data)
    {
        return $this->qb
            ->from('prices')
            ->andWhere('id', '=', $id)
            ->update($data);
    }

    public function insert(array $data)
    {
        return $this->qb
            ->from('prices')
            ->insert($data);
    }

    public function rawQuery(string $sql, array $data = [])
    {
        return $this->qb->rawQuery($sql, $data);
    }
}
