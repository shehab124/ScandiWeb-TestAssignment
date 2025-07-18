import styles from "./Card.module.css"
import { Product } from "../../classes/Product";
import { useNavigate } from "react-router-dom";

const Card = ({product}: {product: Product}) => {

    const navigate = useNavigate();

    return (
        <div className={styles.card} onClick={() => navigate(`/product/${product.id}`)}>
            <div className={product.inStock ? styles.imageWrapper : styles.imageWrapperNotInStock}>
                {!product.inStock && <div className={styles.outOfStock}>OUT OF STOCK</div>}
                <img src={product.gallery[0].url} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p>{product.price.symbol}{product.price.amount}</p>
        </div>
    )
}

export default Card;
