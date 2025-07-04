import styles from "./Card.module.css"
import { Product } from "../../classes/Product";

const Card = ({product}: {product: Product}) => {
    return (
        <div className={styles.card}>
            <img src={product.gallery[0].url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price.symbol}{product.price.amount}</p>
        </div>
    )
}

export default Card;
