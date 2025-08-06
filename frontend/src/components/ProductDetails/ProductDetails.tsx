import styles from "./ProductDetails.module.css";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../../GraphQL/Queries";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Attribute } from "../../interfaces/Attribute";
import parse from 'html-react-parser';
import { useCart } from "react-use-cart";
import type { AttributeSet } from "../../interfaces/AttributeSet";
import type { SelectedAttributes } from "../../interfaces/SelectedAttributes";

const ProductDetails = () => {

    const { id } = useParams();
    const { addItem, items, updateItemQuantity } = useCart();

    const [selectedAttributes, setSelectedAttributes] = useState<Map<string, SelectedAttributes>>(new Map());
    const [currentPicture, setCurrentPicture] = useState<number>(1);

    const { data, error, loading } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: id
        }
    });

    useEffect(() => {
        if (data) {
            setSelectedAttributes(
                new Map(
                    data.product.attributeSets.map(
                        (attributeSet: AttributeSet) =>
                            [attributeSet.name, {
                                    id: attributeSet.attributes[0].id,
                                    value: attributeSet.attributes[0].value,
                                    displayValue: attributeSet.attributes[0].displayValue
                                }
                            ]
                    )
                )
            );
        }
    }, [data, error, loading]);

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
                    attributesJSX.push(<div className={styles.colorButtons}>{buttonsJSX}</div>);
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
            attributeSets: data.product.attributeSets
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
