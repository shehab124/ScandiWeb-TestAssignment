import styles from "./Navbar.module.css"
import { useState, useEffect } from "react";
import Cart from "../CartDropDown/CartDropDown";
import logo from "../../assets/logo.svg";
import { Category } from "../../classes/Category";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../GraphQL/Queries";

const Navbar = ({ selectedCategory, setSelectedCategory}: {selectedCategory: Category, setSelectedCategory: (category: Category) => void}) => {

    const { data, error } = useQuery(GET_CATEGORIES);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (data) {
            setCategories(data.categories.map((category: {id: string, name: string}) => ({id: category.id, name: category.name.toUpperCase()})));
        }
        if (error) {
            console.error('Error fetching categories:', error);
        }
    }, [data, error])

return (
    <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
            <div className={styles.categories}>
                {categories.map((category: {id: string, name: string}) => (
                    <span className={`${styles.category} ${category.id === selectedCategory.id ? styles.selectedCategory : ""}`} key={category.id} onClick={() => setSelectedCategory(category)}>{category.name}</span>
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
