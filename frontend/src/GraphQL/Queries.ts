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
        }
        gallery
        {
            id
            url
            order
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
        attributes {
            id
            name
            type
            values
        }
        }
    }
`
