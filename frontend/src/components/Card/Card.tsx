import styles from "./Card.module.css"
import type { Product } from "../../interfaces/Product";
import { useNavigate } from "react-router-dom";
import greenCart from "../../assets/greenCart.svg";

const Card = (
    {product, handleAddToCart}:
    {product: Product, handleAddToCart: (e: React.MouseEvent, product: Product) => void}
) => {

    const navigate = useNavigate();

    return (
        <div
            className={styles.card}
            onClick={() => navigate(`/product/${product.id}`)}
            data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
            <div className={product.inStock ? styles.imageWrapper : styles.imageWrapperNotInStock}>
                {!product.inStock && <div className={styles.outOfStock}>OUT OF STOCK</div>}
                <img src={product.gallery[0].url} alt={product.name} />
            </div>
            {product.inStock &&
                <button
                    className={styles.greenCart}
                    onClick={(e) => handleAddToCart(e, product)}>
                    <img src={greenCart} alt="greenCart" />
                </button>}
            <h3>{product.name}</h3>
            <p>{product.price.symbol}{product.price.amount}</p>
        </div>
    )
}

export default Card;
