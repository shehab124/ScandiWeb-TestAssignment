import styles from "./Navbar.module.css"
import { useState, useCallback, useEffect } from "react";
import Cart from "../CartDropDown/CartDropDown";
import logo from "../../assets/logo.svg";

const Navbar = () => {

    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

    const fetchCategories = useCallback(async () => {
        try{
            const response = await fetch('http://localhost/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query: `{categories {id name}}`})
            })
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            console.log(data);
            setCategories(data.data.categories.map((category: {id: string, name: string}) => ({id: category.id, name: category.name.toUpperCase()})));
            debugger;
        }
        catch(error) {
            console.error('Error fetching categories:', error);
        }
    }, [])

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories])

    console.log(categories);
return (
    <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
            <div className={styles.categories}>
                {categories.map((category: {id: string, name: string}) => (
                    <span className={styles.category} key={category.id}>{category.name}</span>
                ))}
            </div>
            <div className={styles.navbarCenter}>
                <img src={logo} alt="logo" className={styles.logo} />
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
