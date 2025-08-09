import styles from "./ProductDetails.module.css";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../../GraphQL/Queries";
import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Attribute } from "../../interfaces/Attribute";
import parse from 'html-react-parser';
import { useCart } from "react-use-cart";
import type { AttributeSet } from "../../interfaces/AttributeSet";
import type { SelectedAttributes } from "../../interfaces/SelectedAttributes";
import SnackBar from "../SnackBar/SnackBar";

const ProductDetails = () => {

    const { id } = useParams();
    const { addItem, items, updateItemQuantity } = useCart();
    const [snackBar, setSnackBar] = useState<{text: string, type: "success" | "error"} | null>(null);


    const [selectedAttributes, setSelectedAttributes] = useState<Map<string, SelectedAttributes>>(new Map());
    const [currentPicture, setCurrentPicture] = useState<number>(1);

    const { data, error, loading } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: id
        }
    });

    const isAttributesSelected = () => {
        if(data)
        {
            if(selectedAttributes.size === data.product.attributeSets.length)
                return true;
            else
                return false;
        }
    }

    const renderAttributes = useMemo(() => {
        let attributesJSX: React.ReactElement[] = [];
        if(data)
        {
            data.product.attributeSets.map((attributeSet: AttributeSet) => {
                attributesJSX.push(<div className={styles.attributeTitle}>{attributeSet.name}:</div>)
                let buttonsJSX : React.ReactElement[] = [];
                if(attributeSet.type === "swatch")
                {
                    attributeSet.attributes.map((attribute: Attribute) => {
                        buttonsJSX.push(
                                <button
                                    className={selectedAttributes.has(attributeSet.name)
                                        &&
                                        selectedAttributes.get(attributeSet.name)?.value === attribute.value ?
                                        styles.selectedColor : styles.colorButton
                                    }
                                    style={{ backgroundColor: attribute.value }}
                                    key={attribute.value}
                                    onClick={() => {
                                        setSelectedAttributes(new Map(selectedAttributes.set(attributeSet.name,{
                                            id: attribute.id.toString(),
                                            name: attributeSet.name,
                                            value: attribute.value
                                        })));
                                    }}
                                    disabled={
                                        selectedAttributes.has(attributeSet.name) &&
                                        selectedAttributes.get(attributeSet.name)?.value === attribute.value
                                    }
                                    />
                        )
                    })
                    attributesJSX.push(
                    <div
                        className={styles.colorButtons}
                        data-testid={`product-attribute-${attributeSet.name}`}>
                            {buttonsJSX}
                    </div>
                    );
                }
                else if(attributeSet.type === "text")
                {
                    attributeSet.attributes.map((attribute: Attribute) => {
                        buttonsJSX.push(
                            <button
                                className={selectedAttributes.has(attributeSet.name) &&
                                    selectedAttributes.get(attributeSet.name)?.value === attribute.value ?
                                    styles.selectedTextBtn :
                                    styles.textBtn
                                }
                                key={attribute.value}
                                onClick={() => {
                                    setSelectedAttributes(new Map(selectedAttributes.set(attributeSet.name,{
                                        id: attribute.id.toString(),
                                        name: attributeSet.name,
                                        value: attribute.value
                                    })));
                                }}
                                disabled={selectedAttributes.has(attributeSet.name) && selectedAttributes.get(attributeSet.name)?.value === attribute.value}
                            >
                                {attribute.value}
                            </button>
                        )
                    })
                    attributesJSX.push(
                    <div
                        className={styles.textBtns}
                        data-testid={`product-attribute-${attributeSet.name}`}
                    >
                        {buttonsJSX}
                    </div>);
                }
            });
        }
        return attributesJSX;
    }, [data, selectedAttributes]);


    const handleAddToCart = () => {

        const attributesObject = Object.fromEntries(selectedAttributes);

        for(let i = 0; i < items.length; i++)
        {
            if(items[i].product_id === data.product.id)
            {
                if(JSON.stringify(items[i].selectedAttributes) === JSON.stringify(attributesObject))
                {
                    updateItemQuantity(items[i].id, (items[i].quantity || 0) + 1);
                    return;
                }
            }
        }

        addItem({
            id: (items.length + 1).toString(),
            product_id: data.product.id,
            price: data.product.price.amount,
            name: data.product.name,
            image: data.product.gallery[0].url,
            selectedAttributes: attributesObject,
            attributeSets: data.product.attributeSets
        })

        setSnackBar({
            text: "Product added to cart",
            type: "success"
        });
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={styles.productDetails}>
            <div className={styles.productImages}>
                <div className={styles.smallPictures}>
                    {data.product.gallery.map((picture: {url: string, order: number}) => (
                        <img src={picture.url} alt={data.product.name} onClick={() => setCurrentPicture(picture.order)} />
                    ))}
                </div>
                <div className={styles.currentPictureContainer}>
                    <button className={styles.previousPicture}
                        onClick={() =>
                            (currentPicture > 1 ? setCurrentPicture(currentPicture-1) : setCurrentPicture(data.product.gallery.length))
                            }>
                        &lt;
                    </button>
                    <img src={data.product.gallery[currentPicture-1].url}
                        alt={data.product.name}
                        className={styles.currentPicture}
                        data-testid='product-gallery'
                    />
                    <button
                        className={styles.nextPicture}
                        onClick={() =>
                            (currentPicture < data.product.gallery.length ? setCurrentPicture(currentPicture+1) : setCurrentPicture(1))
                            }>
                        &gt;
                    </button>
                </div>
            </div>
            <div className={styles.productInfo}>
                <h1>{data.product.name}</h1>
                <h2>{data.product.brand}</h2>
                {renderAttributes && (
                    <>
                        <div className={styles.attributes}>
                            {renderAttributes}
                        </div>
                    </>
                )}
                <div className={styles.titles}>Price:</div>
                <p className={styles.price}>{data.product.price.symbol}{data.product.price.amount}</p>
                <button
                    className={styles.addCartBtn}
                    onClick={handleAddToCart}
                    disabled={data.product.inStock === false || !isAttributesSelected()}
                    data-testid='add-to-cart'
                >
                    Add to Cart
                </button>
                <div className={styles.description}
                    data-testid='product-description'
                >{parse(data.product.description)}
                </div>
            </div>
            {snackBar && <SnackBar text={snackBar.text} type={snackBar.type} />}
        </div>
    )
};

export default ProductDetails;
