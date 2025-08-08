import styles from "./ProductList.module.css"
import Card from "../Card/Card.tsx"
import { useEffect, useState } from "react";
import type { Product } from "../../interfaces/Product.ts";
import type { Category } from "../../interfaces/Category.ts";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORY } from "../../GraphQL/Queries";
import { useCart } from "react-use-cart";
import SnackBar from "../SnackBar/SnackBar";
import type { AttributeSet } from "../../interfaces/AttributeSet.ts";

const ProductList = ({selectedCategory}: {selectedCategory: Category}) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [snackBar, setSnackBar] = useState<{text: string, type: "success" | "error"} | null>(null);

    const { addItem} = useCart();

    const { data, error, loading } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: {
            category: selectedCategory.name
        }
    });

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();

        const selectedAttributes = product.attributeSets.map(
            (attributeSet: AttributeSet) =>
                [attributeSet.name, {
                        id: attributeSet.attributes[0].id,
                        value: attributeSet.attributes[0].value,
                        displayValue: attributeSet.attributes[0].displayValue
                    }
                ]
        )
        const attributesObject = Object.fromEntries(selectedAttributes);
        addItem({
            id: product.id,
            product_id: product.id,
            name: product.name,
            price: product.price.amount,
            image: product.gallery[0].url,
            selectedAttributes: attributesObject,
            attributeSets: product.attributeSets,
            quantity: 1
        });

        setSnackBar({
            text: "Product added to cart",
            type: "success"
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
                    <Card
                        key={product.id}
                        product={product}
                        handleAddToCart={(e) => handleAddToCart(e, product)}
                        />
                ))}
            </div>
            {snackBar && <SnackBar text={snackBar.text} type={snackBar.type} />}
        </>
    )
}

export default ProductList;
