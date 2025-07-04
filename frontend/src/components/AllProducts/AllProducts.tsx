import styles from "./AllProducts.module.css"
import Card from "../Card/Card.tsx"
import { useCallback, useEffect, useState } from "react";
import { Product } from "../../classes/Product";
import { Gallery } from "../../classes/Gallery";
import { Price } from "../../classes/Price";

const AllProducts = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = useCallback(async () => {

        const response = await fetch('http://localhost/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query: `{products{id name inStock price{amount symbol}gallery{id url order}}}`})
        })

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(
            data.data.products.map((product: {
                id: string,
                name: string,
                inStock: boolean,
                price: {
                    amount: number,
                    symbol: string
                },
                gallery: {
                    id: string,
                    url: string,
                    order: number
                }[]
            }) => {
                const galleryItems = product.gallery.map(gallery =>
                    new Gallery(gallery.id, gallery.url, gallery.order)
                );

                return new Product(
                    product.id,
                    product.name,
                    product.inStock,
                    null,
                    null,
                    null,
                    new Price(product.price.amount, product.price.symbol, product.price.symbol),
                    galleryItems,
                    []
                );
            })
        );

    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <>
            <h2 className={styles.title}>All Products</h2>
            <div className={styles.products}>
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default AllProducts;
