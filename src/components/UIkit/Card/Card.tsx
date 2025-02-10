import styles from "./Card.module.css";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { ModalCard } from "../ModalCard/ModalCard.tsx";
import { useEffect, useState } from "react";
import { Modal } from "../../Modal/Modal.tsx";
import { format_date } from "../../utils.tsx";
type MessageType = {
  message_id: number;
  text: string;
  timestamp: string;
  user_id: number;
  photos: string[];
  grouped_id: null | number;
};
type User = {
  user_id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo?: string;
};

export function Card({ message }: { message: MessageType }) {
  const hosting = import.meta.env.VITE_HOSTING;
  const images = message.photos;

  const [offset, setOffset] = useState(0);
  const [isVisible, setVisibility] = useState(false);
  const [user, setUser] = useState<User>();

  const incrementOffset = () => {
    setOffset((offset) => offset + 1);
  };
  const decrementOffset = () => {
    setOffset((offset) => offset - 1);
  };

  const imageCards = images.map((image: string, index: number) => (
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

  const modalImages: string[] = images.map(
    (image: string) => `${hosting}/${image}`
  );

  const styleVar: React.CSSProperties = {
    "--number-of-images": `${images.length}`,
    "--offset": `${offset}`,
  } as React.CSSProperties;

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

  const formattedDate = format_date(message.timestamp);

  return (
    <div className={styles.card}>
      <div className={styles.card_info}>
        {user && (
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
              user={{
                user_id: user?.user_id ?? 0, // Дефолтное значение, если user undefined
                first_name: user?.first_name ?? "",
                last_name: user?.last_name ?? "",
                username: user?.username ?? "",
                photo: user?.photo ?? "",
              }}
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
