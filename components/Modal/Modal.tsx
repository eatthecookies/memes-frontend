import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
export function Modal({ children, isVisible, onClose }) {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.modal_overlay}
      onClick={(e) => {
        e.stopPropagation();
        onClose(false);
      }}
    >
      {children}
    </div>,
    document.body
  );
}
