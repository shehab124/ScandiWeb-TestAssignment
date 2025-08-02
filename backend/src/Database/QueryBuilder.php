<?php

namespace App\Database;

use Exception;
use PDO;
use PDOStatement;
use App\Service\Logger;

class QueryBuilder {

    private ?PDO $pdo = null;
    protected string $select = '*';
    protected string $from = '';
    protected array $andWhere = [];
    protected array $orWhere = [];
    protected array $dataArr = [];
    protected string $order = '';
    protected string $limit;
    protected string $offset;
    protected string $group = '';
    protected string $having = '';
    protected array $joins = [];
    private $logger;

    public function __construct() {
        $connection = new Database();
        $this->pdo = $connection->getConnection();
        $this->logger = Logger::getInstance();
    }

    public function select(string ...$columns): QueryBuilder
    {
        $this->select = ' ' . implode(', ', $columns) . ' ';
        return $this;
    }

    public function from(string $table): QueryBuilder
    {
        $this->from = $table;
        return $this;
    }

    public function table(string $table): QueryBuilder
    {
        $this->from = $table;
        return $this;
    }

    // JOIN methods
    public function join(string $table, string $firstColumn, string $operator, string $secondColumn, string $type = 'INNER'): QueryBuilder
    {
        $this->joins[] = " $type JOIN $table ON $firstColumn $operator $secondColumn ";
        return $this;
    }

    public function leftJoin(string $table, string $firstColumn, string $operator, string $secondColumn): QueryBuilder
    {
        return $this->join($table, $firstColumn, $operator, $secondColumn, 'LEFT');
    }

    public function rightJoin(string $table, string $firstColumn, string $operator, string $secondColumn): QueryBuilder
    {
        return $this->join($table, $firstColumn, $operator, $secondColumn, 'RIGHT');
    }

    public function fullJoin(string $table, string $firstColumn, string $operator, string $secondColumn): QueryBuilder
    {
        return $this->join($table, $firstColumn, $operator, $secondColumn, 'FULL');
    }

    private function where(string $column, string $operator, string $value, string $type = 'and'): QueryBuilder
    {
        // Replace dots with underscores because PDO doesn't support dots in parameter names
        $paramName = str_replace('.', '_', $column);

        if($type == 'and')
            $this->andWhere[] = " $column $operator :$paramName ";
        else
            $this->orWhere[] = " $column $operator :$paramName ";

        $this->dataArr[$paramName] = $value;
        return $this;
    }
    public function andWhere(string $column, string $operator, string $value): QueryBuilder
    {
        $this->where($column, $operator, $value, 'and');
        return $this;
    }

    public function orWhere(string $column, string $operator, string $value): QueryBuilder
    {
        $this->where($column, $operator, $value, 'or');
        return $this;
    }

    public function limit(string $limit): QueryBuilder
    {
        $this->limit = " LIMIT $limit ";
        return $this;
    }

    public function offset(string $offset): QueryBuilder
    {
        $this->offset = " OFFSET $offset ";
        return $this;
    }

    public function orderBy(string $column, string $direction = 'ASC'): QueryBuilder
    {
        $this->order = " ORDER BY $column $direction ";
        return $this;
    }

    public function get(): array
    {
        $sql = $this->buildQuery('select');
        return $this->query($sql)->fetch(PDO::FETCH_ASSOC);
    }

    public function getAll(): array
    {
        $sql = $this->buildQuery('select');
        return $this->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function delete(): int
    {
        $sql = $this->buildQuery('delete');
        return $this->query($sql)->rowCount();
    }

    public function update(array $data): int
    {
        $this->dataArr = array_merge($this->dataArr, $data);
        $sql = $this->buildQuery('update', $data);
        return $this->query($sql)->rowCount();
    }

    public function insert(array $data): int
    {
        $this->dataArr = array_merge($this->dataArr, $data);
        $sql = $this->buildQuery('insert', $data);
        $this->query($sql);
        $lastInsertId = $this->pdo->lastInsertId();


        $this->dataArr = [];
        $this->andWhere = [];
        $this->orWhere = [];
        $this->order = '';
        $this->limit = '';
        $this->offset = '';
        $this->group = '';
        $this->having = '';
        $this->joins = [];

        return $lastInsertId;
    }

    public function rawQuery(string $sql, array $data = []):array
    {
        $this->dataArr = $data;
        return $this->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    private function buildQuery(string $mode = 'select', array $data = []): string
    {
        switch($mode) {
            case 'select':
                $sql = ' SELECT ' . $this->select . ' FROM ' . $this->from;
                break;
            case 'delete':
                $sql = ' DELETE FROM ' . $this->from;
                break;
            case 'update':
                $sql = ' UPDATE ' . $this->from . ' SET ';
                foreach($data as $key => $value)
                    $sql .= " $key = :$key, ";

                // remove the last comma
                $sql = rtrim($sql, ', ');
                break;
            case 'insert':
                $sql = ' INSERT INTO ' . $this->from . ' ';
                $sql .= '(' . implode(', ', array_keys($data)) . ') VALUES (';
                foreach($data as $key => $value)
                    $sql .= ":$key, ";

                $sql = rtrim($sql, ', ') . ')';
                break;
        }

        if($mode != 'insert')
        {
            if(!empty($this->joins))
                $sql .= implode('', $this->joins);

            if(!empty($this->andWhere) || !empty($this->orWhere))
                $sql .= ' WHERE ' . implode(' AND ', $this->andWhere) . implode(' OR ', $this->orWhere);

            if(!empty($this->order))
                $sql .= $this->order;

            if(!empty($this->limit))
                $sql .= $this->limit;

            if(!empty($this->offset))
                $sql .= $this->offset;
        }

        // remove extra spaces
        $finalSql = preg_replace('/\s+/', ' ', $sql);

        // Log the built query for debugging
        $this->logger->debug('SQL Query built', [
            'mode' => $mode,
            'original_sql' => $sql,
            'final_sql' => $finalSql,
            'joins' => $this->joins,
            'where_conditions' => array_merge($this->andWhere, $this->orWhere)
        ]);

        return $finalSql;
    }

    private function query(string $sql): PDOStatement|bool
    {
        $this->logger->info('dataArray', [
            'dataArray' => $this->dataArr
        ]);
        try{
            $this->logger->info('SQL', [
                'sql before prepare' => $sql
            ]);
            $stmt = $this->pdo->prepare($sql);
            $this->logger->info('SQL', [
                'sql after prepare' => $sql
            ]);
            $stmt->execute($this->dataArr);
        }
        catch(Exception $e)
        {
            throw new Exception($e->getMessage());
        }


        // Log the SQL query with parameters
        $this->logger->info('SQL Query executed', [
            'sql' => $sql,
            'parameters' => $this->dataArr,
            'table' => $this->from,
            'select' => $this->select
        ]);

        return $stmt;
    }
}
