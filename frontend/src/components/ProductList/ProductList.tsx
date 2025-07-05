import styles from "./ProductList.module.css"
import Card from "../Card/Card.tsx"
import { useEffect, useState } from "react";
import { Product } from "../../classes/Product.ts";
import { Gallery } from "../../classes/Gallery.ts";
import { Price } from "../../classes/Price.ts";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORY } from "../../GraphQL/Queries";
import { Category } from "../../classes/Category";

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
                data.productsByCategory.map((product: {
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
