<?php

namespace App\Model;

interface ModelInterface
{
    public function get(string $id);
    public function getAll();
    public function delete(string $id);
    public function update(string $id, array $data);
    public function insert(array $data);
    public function rawQuery(string $sql, array $data = []);
}
