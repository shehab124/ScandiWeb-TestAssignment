<?php

namespace App\Model;

use App\Model\BaseModel;

class OrderItemModel extends BaseModel
{
    protected string $table = 'order_items';

    public function __construct()
    {
        parent::__construct();
    }

    public function insert(array $data): int
    {
        return $this->qb->insert($data);
    }

}
