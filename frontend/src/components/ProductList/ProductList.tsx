import styles from "./ProductList.module.css"
import Card from "../Card/Card.tsx"
import { useEffect, useState } from "react";
import type { Product } from "../../interfaces/Product.ts";
import type { Category } from "../../interfaces/Category.ts";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORY } from "../../GraphQL/Queries";
import { useCart } from "react-use-cart";

const ProductList = ({selectedCategory}: {selectedCategory: Category}) => {

    const [products, setProducts] = useState<Product[]>([]);
    const { addItem} = useCart();

    const { data, error, loading } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: {
            category: selectedCategory.name
        }
    });

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        debugger;
        addItem({
            id: product.id,
            product_id: product.id,
            name: product.name,
            price: product.price.amount,
            image: product.gallery[0].url,
            selectedAttributes: new Map(),
            attributeSets: product.attributeSets,
            quantity: 1
        });
    }

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
                        attributeSets: product.attributeSets,
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
                    <Card key={product.id} product={product} handleAddToCart={(e) => handleAddToCart(e, product)} />
                ))}
            </div>
        </>
    )
}

export default ProductList;
