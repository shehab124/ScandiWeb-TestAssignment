<?php

namespace App\Service;

use App\Model\OrderModel;
use App\Model\OrderItemModel;
use App\Model\AttributesOrderItemModel;
use Monolog\Logger as MonologLogger;

class OrderService
{
    private OrderModel $orderModel;
    private OrderItemModel $orderItemModel;
    private AttributesOrderItemModel $attributesOrderItemModel;
    private MonologLogger $logger;

    public function __construct()
    {
        $this->orderModel = new OrderModel();
        $this->orderItemModel = new OrderItemModel();
        $this->attributesOrderItemModel = new AttributesOrderItemModel();
        $this->logger = Logger::getInstance();
    }

    public function createOrder(array $orderData): int
    {
        $isValid = $this->validateOrder($orderData);
        if (!$isValid) {
            throw new \Exception('Order data is not valid');
        }

        $orderId = $this->orderModel->insert([
            'total_cost' => $orderData['total_cost'],
            'currency_label' => $orderData['currency_label'],
            'currency_symbol' => $orderData['currency_symbol']
        ]);

        foreach ($orderData['items'] as $item) {
            $orderItemId = $this->orderItemModel->insert([
                'order_id' => $orderId,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity']
            ]);

            foreach ($item['attributes'] as $attribute) {
                $this->attributesOrderItemModel->insert([
                    'order_item_id' => $orderItemId,
                    'attribute_id' => $attribute['attribute_id']
                ]);
            }
        }
        return $orderId;
    }

    private function validateOrder(array $orderData): bool
    {
        $isValid = true;
        if (empty($orderData['items'])) {
            $this->logger->error('Order items are empty');
            $isValid = false;
        }

        if (!is_array($orderData['items'])) {
            $this->logger->error('Items is not an array');
            $isValid = false;
        }

        if (empty($orderData['total_cost'])) {
            $this->logger->error('Total cost is empty');
            $isValid = false;
        }

        if (!is_float($orderData['total_cost'])) {
            $this->logger->error('Total cost is not a float');
            $isValid = false;
        }

        if (empty($orderData['currency_label'])) {
            $this->logger->error('Currency label is empty');
            $isValid = false;
        }

        if (!is_string($orderData['currency_label'])) {
            $this->logger->error('Currency label is not a string');
            $isValid = false;
        }

        if (empty($orderData['currency_symbol'])) {
            $this->logger->error('Currency symbol is empty');
            $isValid = false;
        }

        if (!is_string($orderData['currency_symbol'])) {
            $this->logger->error('Currency symbol is not a string');
            $isValid = false;
        }

        foreach ($orderData['items'] as $item) {
            if (!is_array($item)) {
                $this->logger->error('Item is not an array');
                $isValid = false;
            }

            if (!is_string($item['product_id'])) {
                $this->logger->error('Product ID is not a string');
                $isValid = false;
            }

            if (!is_int($item['quantity'])) {
                $this->logger->error('Quantity is not an integer');
                $isValid = false;
            }

            if (!is_array($item['attributes'])) {
                $this->logger->error('Attributes is not an array');
                $isValid = false;
            }

            foreach ($item['attributes'] as $attribute) {
                if (!is_int($attribute['attribute_id'])) {
                    $this->logger->error('Attribute ID is not an integer');
                    $isValid = false;
                }
            }
        }

        return $isValid;
    }
}
