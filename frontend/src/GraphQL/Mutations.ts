import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
    mutation
        createOrder(
                    $items: [OrderItemInput!]!,
                    $total_cost: Float!,
                    $currency_label: String!,
                    $currency_symbol: String!,
                    )
        {
        createOrder(
                    items: $items,
                    total_cost: $total_cost,
                    currency_label: $currency_label,
                    currency_symbol: $currency_symbol,
                    )
        {
        order_id
        status
        total_cost
        }
    }
`
