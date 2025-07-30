import styles from "./ProductList.module.css"
import Card from "../Card/Card.tsx"
import { useEffect, useState } from "react";
import type { Product } from "../../interfaces/Product.ts";
import type { Category } from "../../interfaces/Category.ts";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORY } from "../../GraphQL/Queries";

const ProductList = ({selectedCategory}: {selectedCategory: Category}) => {

    const [products, setProducts] = useState<Product[]>([]);
    const { data, error, loading } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: {
            category: selectedCategory.name
        }
    });

    useEffect(() => {
        if(data)
        {
            setProducts(
                data.productsByCategory.map((product: Product) => {
                    const typedProduct: Product = {
                        id: product.id,
                        name: product.name,
                        inStock: product.inStock,
                        price: {
                            amount: product.price.amount,
                            symbol: product.price.symbol,
                            currency: product.price.currency
                        },
                        gallery: product.gallery,
                        description: null,
                        brand: null,
                        category: null,
                        attributes: [],
                        selectedAttributes: new Map(),
                        quantity: 0
                    };

                    return typedProduct;
                })
            );
        }
        if (error) {
            console.error('Error fetching products:', error);
        }
    }, [data, error]);

    return (
        <>
            <h2 className={styles.title}>{selectedCategory ? selectedCategory.name : "All Products"}</h2>
            <div className={styles.products}>
                {loading ? <p>Loading...</p> : products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default ProductList;
