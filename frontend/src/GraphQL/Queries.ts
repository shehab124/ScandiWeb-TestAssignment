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
