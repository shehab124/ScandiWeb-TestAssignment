import { useCart } from "react-use-cart";
import styles from "./CartDropDown.module.css"
import type { Attribute } from "../../interfaces/Attribute";
import { useState, useEffect } from "react";

const Cart = () => {

    const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem, cartTotal, updateItem } = useCart();
    const [cartItems, setCartItems] = useState(items);

    // Update local state when cart items change
    useEffect(() => {
        setCartItems(items);
    }, [items]);

    const handleAttributeClick = (attribute: Attribute, value: string, itemId: string) => {
        const updatedItems = cartItems.map(item => {
            if (item.id === itemId) {
                const updatedItem = {
                    ...item,
                    selectedAttributes: {
                        ...item.selectedAttributes,
                        [attribute.name]: value
                    }
                };
                // Update the item in the cart
                updateItem(itemId, updatedItem);
                return updatedItem;
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    const renderAttributes = (item: any) => {
        let attributesJSX: React.ReactElement[] = [];
        if (item.attributes) {
            item.attributes.map((attribute: Attribute) => {
                attributesJSX.push(<div key={attribute.name} className={styles.attributeTitle}>{attribute.name}:</div>);
                let buttonsJSX: React.ReactElement[] = [];

                if (attribute.type === "swatch") {
                    attribute.values.map((value: string) => {
                        buttonsJSX.push(
                            <button
                                key={value}
                                className={
                                    item.selectedAttributes && item.selectedAttributes[attribute.name] === value ?
                                        styles.selectedColor : styles.colorButton
                                    }
                                    style={{ backgroundColor: value }}
                                    onClick={() => handleAttributeClick(attribute, value, item.id)}
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
                                key={value}
                                className={
                                    item.selectedAttributes && item.selectedAttributes[attribute.name] === value ?
                                        styles.selectedTextBtn : styles.textBtn
                                }
                                onClick={() => handleAttributeClick(attribute, value, item.id)}
                            >
                                {value}
                            </button>
                        )
                    })
                    attributesJSX.push(<div className={styles.textBtns}>{buttonsJSX}</div>);
                }
                })
            }

            return attributesJSX;
    }

    return (
        <div className={styles.cartDropdown}>
            <h3>My Bag, {totalUniqueItems} Item{totalUniqueItems > 1 ? "s" : ""}</h3>

            {isEmpty && <div className={styles.cartEmpty}>Your cart is empty</div>}

            {!isEmpty && (
                <>
                    <div className={styles.cartItems}>
                        {cartItems.map((item) => (
                            <div className={styles.cartItem} key={item.id}>
                                <div className={styles.cartItemDetails}>
                                    <p className={styles.cartItemName}>{item.name}</p>
                                    <p className={styles.cartItemPrice}>${item.price}</p>
                                    {item.attributes && (
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

                    <button className={styles.checkoutBtn}>
                        Checkout
                    </button>
                </>
            )}
        </div>
    )
}

export default Cart;
