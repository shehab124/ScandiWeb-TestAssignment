import styles from "./AllProducts.module.css"
import Card from "../Card/Card.tsx"

const AllProducts = () => {
    return (
        <>
            <h2 className={styles.title}>All Products</h2>
            <div className={styles.products}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />

            </div>
        </>
    )
}

export default AllProducts;
