import { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
type ModalType = {
  children: ReactNode;
  isVisible: boolean;
  onClose: (value: boolean) => void;
};
export function Modal({ children, isVisible, onClose }: ModalType) {
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
