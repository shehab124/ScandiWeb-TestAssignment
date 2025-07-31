<?php

namespace App\Model;

use App\Model\BaseModel;

class AttributeModel extends BaseModel
{
    protected string $table = 'attributes';

    public function __construct()
    {
        parent::__construct();
    }

    public function getByAttributeSetId(string $attributeSetId): array
    {
        return $this->qb
            ->andWhere('attribute_set_id', '=', $attributeSetId)
            ->orderBy('id')
            ->getAll();
    }

    public function getAll(): array
    {
        return $this->qb
            ->orderBy('id')
            ->getAll();
    }
}
