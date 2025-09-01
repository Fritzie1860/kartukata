import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Latihan Kemampuan Verbal</h1>

      <div className={styles.buttons}>
        <button className={styles.menuButton} onClick={() => navigate("/sinonim")}>
          SINONIM
        </button>
        <button className={styles.menuButton} onClick={() => navigate("/antonim")}>
          ANTONIM
        </button>
        <button className={styles.menuButton} onClick={() => navigate("/analogi")}>
          ANALOGI
        </button>
      </div>

      <a 
        href="https://www.linkedin.com/in/fritzie-primananda"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footerLink}
        >
        <p className={styles.footer}>@primananda.fritzie</p>
    </a>

    </div>
  );
}
