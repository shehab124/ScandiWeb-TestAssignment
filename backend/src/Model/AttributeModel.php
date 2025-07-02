<?php

namespace App\Model;

use App\Model\ModelInterface;
use App\Database\QueryBuilder;

class AttributeModel implements ModelInterface
{
    private QueryBuilder $qb;

    public function __construct()
    {
        $this->qb = new QueryBuilder();
    }

    public function get(string $id)
    {
        return $this->qb
            ->from('attributes')
            ->andWhere('id', '=', $id)
            ->get();
    }

    public function getByAttributeSetId(string $attributeSetId)
    {
        return $this->qb
            ->from('attributes')
            ->andWhere('attribute_set_id', '=', $attributeSetId)
            ->orderBy('id')
            ->getAll();
    }

    public function getAll()
    {
        return $this->qb
            ->from('attributes')
            ->orderBy('id')
            ->getAll();
    }

    public function delete(string $id)
    {
        return $this->qb
            ->from('attributes')
            ->andWhere('id', '=', $id)
            ->delete();
    }

    public function update(string $id, array $data)
    {
        return $this->qb
            ->from('attributes')
            ->andWhere('id', '=', $id)
            ->update($data);
    }

    public function insert(array $data)
    {
        return $this->qb
            ->from('attributes')
            ->insert($data);
    }

    public function rawQuery(string $sql, array $data = [])
    {
        return $this->qb->rawQuery($sql, $data);
    }
}
