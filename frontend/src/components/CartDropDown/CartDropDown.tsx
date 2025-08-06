import { useCart } from "react-use-cart";
import styles from "./CartDropDown.module.css"
import type { Attribute } from "../../interfaces/Attribute";
import type { AttributeSet } from "../../interfaces/AttributeSet";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../../GraphQL/Mutations";
import { useState } from "react";
import SnackBar from "../SnackBar/SnackBar";

const Cart = () => {

    const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem, cartTotal, updateItem } = useCart();

    const [createOrder] = useMutation(CREATE_ORDER);
    const [snackBar, setSnackBar] = useState<{text: string, type: "success" | "error"} | null>(null);

    const handleAttributeClick = (attribute: Attribute, value: string, itemId: string, attributeSetName: string) => {
        const item = items.find(item => item.id === itemId);
        if (item) {
            const updatedItem = {
                ...item,
                selectedAttributes: {
                    ...item.selectedAttributes,
                    [attributeSetName]: {
                        id: attribute.id,
                        name: attributeSetName,
                        value: value
                    }
                }
            };
            // Update the item in the cart
            updateItem(itemId, updatedItem);
        }
    };

    const renderAttributes = (item: any) => {
        let attributesJSX: React.ReactElement[] = [];
        if (item.attributeSets) {
            item.attributeSets.forEach((attributeSet: AttributeSet) => {
                attributesJSX.push(<div key={attributeSet.name} className={styles.attributeTitle}>{attributeSet.name}:</div>);
                let buttonsJSX: React.ReactElement[] = [];

                if (attributeSet.type === "swatch") {
                    attributeSet.attributes.forEach((attribute: Attribute) => {
                        buttonsJSX.push(
                            <button
                                key={attribute.value}
                                className={
                                    item.selectedAttributes[attributeSet.name]?.value === attribute.value ?
                                        styles.selectedColor : styles.colorButton
                                    }
                                style={{ backgroundColor: attribute.value }}
                                onClick={() => handleAttributeClick(attribute, attribute.value, item.id, attributeSet.name)}
                            />
                        );
                    });
                    attributesJSX.push(<div className={styles.colorButtons}>{buttonsJSX}</div>);
                }
                else if(attributeSet.type === "text") {
                    attributeSet.attributes.forEach((attribute: Attribute) => {
                        buttonsJSX.push(
                            <button
                                key={attribute.value}
                                className={
                                    item.selectedAttributes[attributeSet.name]?.value === attribute.value ?
                                        styles.selectedTextBtn : styles.textBtn
                                }
                                onClick={() => handleAttributeClick(attribute, attribute.value, item.id, attributeSet.name)}
                            >
                                {attribute.value}
                            </button>
                        );
                    });
                    attributesJSX.push(<div className={styles.textBtns}>{buttonsJSX}</div>);
                }
            });
        }

            return attributesJSX;
    }

    const handleCheckout = async () => {
        let orderItems = [];

        for (const item of items) {
            let attributes = [];
            for (const attributeSet in item.selectedAttributes) {
                attributes.push({
                    attribute_id: parseInt(item.selectedAttributes[attributeSet].id)
                });
            }

            orderItems.push({
                product_id: item.product_id,
                quantity: item.quantity,
                attributes: attributes
            });
        }

        let order = await createOrder({
            variables: {
                items: orderItems,
                total_cost: cartTotal,
                currency_label: "USD",
                currency_symbol: "$"
            }
        });

        if (order.data.createOrder.status === "success") {
            setSnackBar({
                text: "Order placed successfully",
                type: "success"
            });
        } else {
            setSnackBar({
                text: "Order failed",
                type: "error"
            });
        }
    }

    return (
        <div className={styles.cartDropdown}>
            <h3>My Bag, {totalUniqueItems} Item{totalUniqueItems > 1 ? "s" : ""}</h3>

            {isEmpty && <div className={styles.cartEmpty}>Your cart is empty</div>}

            {!isEmpty && (
                <>
                    <div className={styles.cartItems}>
                        {items.map((item) => (
                            <div className={styles.cartItem} key={item.id}>
                                <div className={styles.cartItemDetails}>
                                    <p className={styles.cartItemName}>{item.name}</p>
                                    <p className={styles.cartItemPrice}>${item.price}</p>
                                    {item.attributeSets && (
                                        <p className={styles.cartItemAttributes}>
                                            {renderAttributes(item)}
                                        </p>
                                    )}
                                </div>
                                <div className={styles.quantityControls}>
                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() => updateItemQuantity(item.id, (item.quantity || 1) + 1)}
                                    >
                                        +
                                    </button>
                                    <span className={styles.quantityDisplay}>{item.quantity || 1}</span>
                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() => {
                                            const newQuantity = (item.quantity || 1) - 1;
                                            if (newQuantity === 0) {
                                                removeItem(item.id);
                                            } else {
                                                updateItemQuantity(item.id, newQuantity);
                                            }
                                        }}
                                    >
                                        -
                                    </button>
                                </div>
                                <img className={styles.cartItemImage} src={item.image} alt={item.name} />
                            </div>
                        ))}
                    </div>

                    <div className={styles.cartTotalRow}>
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <button className={styles.checkoutBtn} onClick={handleCheckout}>
                        Checkout
                    </button>
                </>
            )}

            {snackBar && <SnackBar text={snackBar.text} type={snackBar.type} />}
        </div>
    )
}

export default Cart;
