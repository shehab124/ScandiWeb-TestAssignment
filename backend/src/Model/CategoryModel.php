<?php

namespace App\Model;

use App\Model\ModelInterface;
use App\Database\QueryBuilder;

class CategoryModel implements ModelInterface
{
    private QueryBuilder $queryBuilder;

    public function __construct()
    {
        $this->queryBuilder = new QueryBuilder();
        $this->queryBuilder->from('categories');
    }

    public function get(string $id): array
    {
        return $this->queryBuilder->select('*')->andWhere('id', '=', $id)->get();
    }

    public function getAll(): array
    {
        return $this->queryBuilder->select('*')->getAll();
    }

    public function delete(string $id): int
    {
        return $this->queryBuilder->andWhere('id', '=', $id)->delete();
    }

    public function update(string $id, array $data): int
    {
        return $this->queryBuilder->andWhere('id', '=', $id)->update($data);
    }

    public function insert(array $data): int
    {
        return $this->queryBuilder->insert($data);
    }

    public function rawQuery(string $sql, array $data = []): array
    {
        return $this->queryBuilder->rawQuery($sql, $data);
    }
}
