import styles from "./ProductDetails.module.css";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../../GraphQL/Queries";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Attribute } from "../../interfaces/Attribute";
import parse from 'html-react-parser';
import { useCart } from "react-use-cart";

const ProductDetails = () => {

    const { id } = useParams();
    const { addItem, items, updateItemQuantity } = useCart();

    const [selectedAttributes, setSelectedAttributes] = useState<Map<string, string>>(new Map());
    const [currentPicture, setCurrentPicture] = useState<number>(1);

    const { data, error, loading } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: id
        }
    });

    useEffect(() => {
        if (data) {
            setSelectedAttributes(new Map(data.product.attributes.map((attribute: Attribute) => [attribute.name, attribute.values[0]])));
        }
    }, [data, error, loading]);

    const renderAttributes = useMemo(() => {
        let attributesJSX: React.ReactElement[] = [];
        if(data)
        {
            data.product.attributes.map((attribute: Attribute) => {
                attributesJSX.push(<div className={styles.attributeTitle}>{attribute.name}:</div>)
                let buttonsJSX : React.ReactElement[] = [];
                if(attribute.type === "swatch")
                {
                    attribute.values.map((value: string) => {
                        buttonsJSX.push(
                                <button
                                    className={selectedAttributes.has(attribute.name)
                                        &&
                                        selectedAttributes.get(attribute.name) === value ?
                                        styles.selectedColor : styles.colorButton
                                    }
                                    style={{ backgroundColor: value }}
                                    key={value}
                                    onClick={() => {
                                        setSelectedAttributes(new Map(selectedAttributes.set(attribute.name, value)));
                                    }}
                                    disabled={
                                        selectedAttributes.has(attribute.name) &&
                                        selectedAttributes.get(attribute.name) === value
                                    }
                                    />
                        )
                    })
                    attributesJSX.push(<div className={styles.colorButtons}>{buttonsJSX}</div>);
                }
                else if(attribute.type === "text")
                {
                    attribute.values.map((value: string) => {
                        buttonsJSX.push(
                            <button
                                className={selectedAttributes.has(attribute.name) &&
                                    selectedAttributes.get(attribute.name) === value ?
                                    styles.selectedTextBtn :
                                    styles.textBtn
                                }
                                key={value}
                                onClick={() => {
                                    setSelectedAttributes(new Map(selectedAttributes.set(attribute.name, value)));
                                }}
                                disabled={selectedAttributes.has(attribute.name) && selectedAttributes.get(attribute.name) === value}
                            >
                                {value}
                            </button>
                        )
                    })
                    attributesJSX.push(<div className={styles.textBtns}>{buttonsJSX}</div>);
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
            attributes: data.product.attributes
        })
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={styles.productDetails}>
            <h1 className={styles.mobileTitle}>{data.product.name}</h1>
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
                        className={styles.currentPicture} />
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
                <h1>{data.product.name} - {data.product.brand}</h1>
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
                    disabled={data.product.inStock === false}
                    >
                    Add to Cart
                </button>
                <div className={styles.description}>{parse(data.product.description)}</div>
            </div>
        </div>
    )
};

export default ProductDetails;
