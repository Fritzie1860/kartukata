import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
    return(
        <a href="https://www.linkedin.com/in/fritzie-primananda"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
        >
            <p className={styles.footer}>ada kesalahan? kontak @primananda.fritzie</p>
        </a>
    );  
}