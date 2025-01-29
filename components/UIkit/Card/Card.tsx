import styles from "./Card.module.css";
import { RightOutlined, LeftOutlined, UserOutlined } from "@ant-design/icons";
import { ModalCard } from "../ModalCard/ModalCard";
import { useEffect, useState, useCallback } from "react";
import { Modal } from "../../Modal/Modal";
import { format_date } from "../../utils.tsx";

export function Card({ message }) {
  const hosting = import.meta.env.VITE_HOSTING;
  const images = message.photos;
  let [offset, setOffset] = useState(0);
  let [isVisible, setVisibility] = useState(false);
  let [user, setUser] = useState<string[]>([]);

  // Используем useCallback, чтобы обработчик не создавался заново на каждом рендере

  let incrementOffset = () => {
    setOffset((offset) => offset + 1);
  };
  let decrementOffset = () => {
    setOffset((offset) => offset - 1);
  };
  let imageCards = images.map((image, index) => (
    <div className={styles.imageContainer} key={index}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${hosting}/${image})`,
        }}
      ></div>

      <img className={styles.image} alt="Мем" src={`${hosting}/${image}`} />
    </div>
  ));

  let modalImages = images.map((image) => `${hosting}/${image}`);

  const styleVar = {
    "--number-of-images": `${images.length}`,
    "--offset": `${offset}`,
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${hosting}/users/${message["user_id"]}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    if (message["user_id"]) {
      fetchUser();
    }
  }, []);

  let formattedDate = format_date(message.timestamp);

  return (
    <div className={styles.card}>
      <div className={styles.card_info}>
        {user.photo && (
          <img
            className={styles.avatar}
            src={`${hosting}/${user.photo}`}
            alt=""
          />
        )}
        <p>
          {user &&
            (user.first_name || user.last_name
              ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
              : user.username)}
        </p>
      </div>

      {message.text && <p className={styles.text}>{message.text}</p>}

      <div
        className={styles.gallery_container}
        onClick={() => setVisibility(true)}
      >
        {offset > 0 && (
          <LeftOutlined
            onClick={(e) => {
              e.stopPropagation();
              decrementOffset();
            }}
            className={styles.left_arrow}
          />
        )}
        {offset < images.length - 1 && (
          <RightOutlined
            onClick={(e) => {
              e.stopPropagation();
              incrementOffset();
            }}
            className={styles.right_arrow}
          />
        )}

        <div className={styles.gallery} style={styleVar}>
          {imageCards}
          <Modal isVisible={isVisible} onClose={setVisibility}>
            <ModalCard
              incrementOffset={incrementOffset}
              decrementOffset={decrementOffset}
              offset={offset}
              images={images}
              onClose={() => setVisibility(false)}
              user={user}
              date={formattedDate}
              text={message.text}
            >
              {modalImages[offset]}
            </ModalCard>
          </Modal>
        </div>
      </div>
      <p className={styles.date}>
        <a href={`https://t.me/c/1550511377/${message.message_id}`}>
          {formattedDate}
        </a>
      </p>
    </div>
  );
}
