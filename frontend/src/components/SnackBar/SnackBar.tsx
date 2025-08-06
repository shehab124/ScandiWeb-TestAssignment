import styles from './SnackBar.module.css'
import { useState, useEffect } from "react";

const SnackBar = (
    {
        text,
        type,
        duration = 3000
    }: {
        text: string,
        type: "success" | "error",
        duration?: number
    }
) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(false);
        }, duration);
    }, [duration]);

    return (
        <div className={styles.snackbar} style={
            {backgroundColor: type === "success" ? "var(--primary-color)" : "red",
            display: isVisible ? "block" : "none"}
            }>
            <p>{text}</p>
        </div>
    )
}

export default SnackBar
