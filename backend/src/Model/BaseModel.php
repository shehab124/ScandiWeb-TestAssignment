<?php

namespace App\Model;

use App\Database\QueryBuilder;

abstract class BaseModel {
    protected QueryBuilder $qb;
    protected string $table;

    public function __construct()
    {
        $this->qb = new QueryBuilder();
        $this->qb->from($this->table);
    }

    public function get(string $id): array
    {
        return $this->qb
            ->select('*')
            ->andWhere('id', '=', $id)
            ->get();
    }
    public function getAll(): array
    {
        return $this->qb
            ->select('*')
            ->getAll();
    }
    public function delete(string $id): int
    {
        return $this->qb
            ->andWhere('id', '=', $id)
            ->delete();
    }
    public function update(string $id, array $data): int
    {
        return $this->qb
            ->andWhere('id', '=', $id)
            ->update($data);
    }
    public function insert(array $data): int
    {
        return $this->qb
            ->insert($data);
    }
}
