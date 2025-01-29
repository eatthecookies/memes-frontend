import React from "react";
import { Navigation } from "./Navigation/Navigation";
import styles from "./Header.module.css";
export function Header() {
  return (
    <div className={styles.header}>
      <h1> Мемы v.1</h1>
      <nav>
        <Navigation />
      </nav>
    </div>
  );
}
