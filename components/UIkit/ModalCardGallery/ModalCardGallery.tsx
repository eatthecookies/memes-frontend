import React, { useState } from "react";
import styles from "./ModalCardGallery.module.css";

export function ModalCardGallery({ className, src }) {
  return (
    <div className={styles.modal}>
      <img alt="s" src={src} className={className} />
    </div>
  );
}
