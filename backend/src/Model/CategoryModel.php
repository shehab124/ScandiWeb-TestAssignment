<?php

namespace App\Model;

use App\Model\BaseModel;

class CategoryModel extends BaseModel
{
    protected string $table = 'categories';

    public function __construct()
    {
        parent::__construct();
    }

}
