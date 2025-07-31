<?php

namespace App\Model;

use App\Model\BaseModel;

class OrderModel extends BaseModel
{
    protected string $table = 'orders';

    public function __construct()
    {
        parent::__construct();
    }

}
