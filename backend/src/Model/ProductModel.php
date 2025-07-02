<?php

namespace App\Model;

use App\Model\ModelInterface;
use App\Database\QueryBuilder;

class ProductModel implements ModelInterface
{
    private QueryBuilder $qb;

    public function __construct()
    {
        $this->qb = new QueryBuilder();
    }

    public function get(string $id): array
    {
        // Get product with category and price
        return $this->qb
            ->select('p.*', 'c.name as category_name', 'pr.price', 'pr.currency_label', 'pr.currency_symbol')
            ->from('products p')
            ->leftJoin('categories c', 'p.category_id', '=', 'c.id')
            ->leftJoin('prices pr', 'p.id', '=', 'pr.product_id')
            ->andWhere('p.id', '=', $id)
            ->get();
    }

    public function getAll(): array
    {
        // Get all products with category and price
        return $this->qb
            ->select('p.*', 'c.name as category_name', 'pr.price', 'pr.currency_label', 'pr.currency_symbol')
            ->from('products p')
            ->leftJoin('categories c', 'p.category_id', '=', 'c.id')
            ->leftJoin('prices pr', 'p.id', '=', 'pr.product_id')
            ->orderBy('p.name')
            ->getAll();
    }

    public function getByCategory(string $categoryName): array
    {

        $query = $this->qb
            ->select('p.*', 'c.name as category_name', 'pr.price', 'pr.currency_label', 'pr.currency_symbol')
            ->from('products p')
            ->leftJoin('categories c', 'p.category_id', '=', 'c.id')
            ->leftJoin('prices pr', 'p.id', '=', 'pr.product_id')
            ->orderBy('p.name');

        if (strtolower($categoryName) !== 'all') {
            $query->andWhere('c.name', '=', $categoryName);
        }

        return $query->getAll();
    }

    public function getProductGallery(string $productId): array
    {
        return $this->qb
            ->select('*')
            ->from('product_gallery')
            ->andWhere('product_id', '=', $productId)
            ->orderBy('display_order')
            ->getAll();
    }

    public function getProductAttributes(string $productId): array
    {
        // Get attribute sets and their attributes
        $results = $this->qb
            ->select('atts.id as set_id', 'atts.name as set_name', 'atts.type as set_type',
                     'att.id as attr_id', 'att.display_value', 'att.value')
            ->from('attribute_sets atts')
            ->leftJoin('attributes att', 'atts.id', '=', 'att.attribute_set_id')
            ->andWhere('atts.product_id', '=', $productId)
            ->orderBy('atts.id')
            ->orderBy('att.id')
            ->getAll();

        // Group by attribute set
        $grouped = [];
        foreach ($results as $row) {
            $setName = $row['set_name'];
            if (!isset($grouped[$setName])) {
                $grouped[$setName] = [
                    'name' => $setName,
                    'type' => $row['set_type'],
                    'values' => []
                ];
            }
            if ($row['display_value']) {
                $grouped[$setName]['values'][] = $row['display_value'];
            }
        }

        return array_values($grouped);
    }

    public function delete(string $id): int
    {
        // Delete product (cascading will handle related data)
        return $this->qb
            ->from('products')
            ->andWhere('id', '=', $id)
            ->delete();
    }

    public function update(string $id, array $data): int
    {
        return $this->qb
            ->from('products')
            ->andWhere('id', '=', $id)
            ->update($data);
    }

    public function insert(array $data): int
    {
        return $this->qb
            ->from('products')
            ->insert($data);
    }

    public function rawQuery(string $sql, array $data = []): array
    {
        return $this->qb->rawQuery($sql, $data);
    }
}
