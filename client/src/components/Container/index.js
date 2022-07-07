import React from "react";
import styles from "./container.module.css"

export default function Container({ children }) {
    console.log(styles.container)
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}