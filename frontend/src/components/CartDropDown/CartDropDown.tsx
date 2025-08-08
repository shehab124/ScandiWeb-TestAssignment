import { useCart } from "react-use-cart";
import styles from "./CartDropDown.module.css"
import type { Attribute } from "../../interfaces/Attribute";
import type { AttributeSet } from "../../interfaces/AttributeSet";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../../GraphQL/Mutations";
import { useState } from "react";
import SnackBar from "../SnackBar/SnackBar";

const Cart = () => {

    const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem, cartTotal, updateItem, emptyCart } = useCart();

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
                const attributeSetNameKebab = attributeSet.name.toLowerCase().replace(/\s+/g, '-');

                attributesJSX.push(<div
                                    key={attributeSet.name}
                                    className={styles.attributeTitle}>{attributeSet.name}:</div>);
                let buttonsJSX: React.ReactElement[] = [];

                if (attributeSet.type === "swatch") {
                    attributeSet.attributes.forEach((attribute: Attribute) => {
                        const isSelected = item.selectedAttributes[attributeSet.name]?.value === attribute.value;
                        const attributeValueKebab = attribute.value.toLowerCase().replace(/\s+/g, '-');
                        const testId = isSelected
                            ? `cart-item-attribute-${attributeSetNameKebab}-${attributeValueKebab}-selected`
                            : `cart-item-attribute-${attributeSetNameKebab}-${attributeValueKebab}`;

                        buttonsJSX.push(
                            <button
                                key={attribute.value}
                                className={
                                    isSelected ? styles.selectedColor : styles.colorButton
                                }
                                style={{ backgroundColor: attribute.value }}
                                onClick={() => handleAttributeClick(attribute, attribute.value, item.id, attributeSet.name)}
                                data-testid={testId}
                            />
                        );
                    });
                    attributesJSX.push(<div className={styles.colorButtons} data-testid={`cart-item-attribute-${attributeSetNameKebab}`}>{buttonsJSX}</div>);
                }
                else if(attributeSet.type === "text") {
                    attributeSet.attributes.forEach((attribute: Attribute) => {
                        const isSelected = item.selectedAttributes[attributeSet.name]?.value === attribute.value;
                        const attributeValueKebab = attribute.value.toLowerCase().replace(/\s+/g, '-');
                        const testId = isSelected
                            ? `cart-item-attribute-${attributeSetNameKebab}-${attributeValueKebab}-selected`
                            : `cart-item-attribute-${attributeSetNameKebab}-${attributeValueKebab}`;

                        buttonsJSX.push(
                            <button
                                key={attribute.value}
                                className={
                                    isSelected ? styles.selectedTextBtn : styles.textBtn
                                }
                                onClick={() => handleAttributeClick(attribute, attribute.value, item.id, attributeSet.name)}
                                data-testid={testId}
                            >
                                {attribute.value}
                            </button>
                        );
                    });
                    attributesJSX.push(<div className={styles.textBtns} data-testid={`cart-item-attribute-${attributeSetNameKebab}`}>{buttonsJSX}</div>);
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
            emptyCart();
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
                                        data-testid='cart-item-amount-increase'
                                    >
                                        +
                                    </button>
                                    <span
                                        className={styles.quantityDisplay}
                                        data-testid='cart-item-amount'
                                    >
                                        {item.quantity || 1}
                                    </span>
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
                                        data-testid='cart-item-amount-decrease'
                                    >
                                        -
                                    </button>
                                </div>
                                <img className={styles.cartItemImage} src={item.image} alt={item.name} />
                            </div>
                        ))}
                    </div>
            )}
            <div className={styles.cartTotalRow}>
                <span>Total:</span>
                $<span data-testid='cart-total'>{cartTotal.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutBtn}
                    disabled={isEmpty}
                    data-testid='checkout-btn'
                    onClick={handleCheckout}
            >
                Checkout
            </button>

            {snackBar && <SnackBar text={snackBar.text} type={snackBar.type} />}
        </div>
    )
}

export default Cart;
