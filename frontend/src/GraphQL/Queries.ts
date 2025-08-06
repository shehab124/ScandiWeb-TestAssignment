import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
        }
    }
`

export const GET_PRODUCTS_BY_CATEGORY = gql`
    query productsByCategory($category: String!) {
        productsByCategory(category: $category) {
        id
        name
        inStock
        price
        {
            amount
            symbol
            currency
        }
        gallery
        {
            id
            url
            order
        }
        attributeSets {
            id
            name
            type
            attributes {
                id
                displayValue
                value
            }
        }
    }
}
`
export const GET_PRODUCT_BY_ID = gql`
    query product($id: String!) {
        product(id: $id) {
        id
        name
        inStock
        description
        brand
        category {
            id
            name
        }
        price {
            amount
            currency
            symbol
        }
        gallery {
            id
            url
            order
        }
        attributeSets {
            id
            name
            type
            attributes {
                id
                displayValue
                value
            }
        }
        }
    }
`
