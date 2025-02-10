import { MouseEventHandler } from "react";
import styles from "./ModalCard.module.css";
import { RightOutlined, LeftOutlined, CloseOutlined } from "@ant-design/icons";
type User = {
  user_id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo?: string;
};
type TypeModalCard = {
  children: string;
  decrementOffset: MouseEventHandler<HTMLSpanElement>;
  incrementOffset: MouseEventHandler<HTMLSpanElement>;
  offset: number;
  images: string[];
  onClose: () => void;
  user: User;
  date: string;
  text: string;
};
export function ModalCard({
  children,
  decrementOffset,
  incrementOffset,
  offset,
  images,
  onClose,
  user,
  date,
  text,
}: TypeModalCard) {
  const hosting = import.meta.env.VITE_HOSTING;
  return (
    <div className={styles.modal_card} onClick={(e) => e.stopPropagation()}>
      <CloseOutlined className={styles.cross} onClick={onClose} />

      <div className={styles.modal_image_container}>
        {offset > 0 && (
          <LeftOutlined
            onClick={decrementOffset}
            className={styles.left_arrow}
          />
        )}
        <img className={styles.modal_image} src={children} alt="" />
        {offset < images.length - 1 && (
          <RightOutlined
            onClick={incrementOffset}
            className={styles.right_arrow}
          />
        )}
      </div>
      <div className={styles.modal_info}>
        <div className={styles.card_info}>
          {user.photo !== null && (
            <img
              className={styles.avatar}
              src={`${hosting}/${user.photo}`}
              alt=""
            />
          )}
          <p>
            {user.first_name || user.last_name
              ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
              : user.username}
          </p>
        </div>

        {text && <p className={styles.text}>{text}</p>}
        <p className={styles.date}>{date}</p>
      </div>
    </div>
  );
}
