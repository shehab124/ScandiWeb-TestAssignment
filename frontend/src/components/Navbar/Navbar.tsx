import styles from "./Navbar.module.css"
import { useState } from "react";
import Cart from "../CartDropDown/CartDropDown";
const Navbar = () => {

    const [cartOpen, setCartOpen] = useState(false);

return (
    <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
            <div className={styles.categories}>
                <span className={styles.category}>All</span>
                <span className={styles.category}>Clothes</span>
                <span className={styles.category}>Tech</span>
            </div>
            <div className={styles.navbarCenter}>
                <h1 className={styles.logo}>MVP Market</h1>
            </div>
            <div className={styles.navbarCart}>
                <span className="cart-icon" onClick={() => setCartOpen((open) => !open)}
                    style={{cursor: "pointer"}}>🛒</span>
                {cartOpen && <Cart />}
            </div>
        </div>
    </nav>
);
};

export default Navbar;
