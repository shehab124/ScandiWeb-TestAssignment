import styles from "./CartDropDown.module.css"

const Cart = () => {
    return (
        <div className={styles.cartDropdown}>
            <h3>My Bag</h3>
            <p>0 Item</p>
            <div className={styles.cartEmpty}>Your cart is empty</div>
            <div className={styles.cartTotalRow}>
                <span>Total:</span>
                <span>$0</span>
            </div>

        </div>
    )
}

export default Cart;
