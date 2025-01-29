import Image from "next/image";
import { Header } from "../components/Header/Header";
import styles from "./index.module.css";
import { Footer } from "../components/Footer/Footer";
import { Card } from "../components/UIkit/Card/Card";
import { useEffect, useState } from "react";
export default function Page() {
  const [messages, setMessages] = useState<string[]>([]);

  let message = {
    message_id: 114761,
    text: "",
    timestamp: "2025-01-23 21:05:50",
    user_id: 7143744877,
    photos: [
      "static/images/photo_2025-01-25_00-43-42.jpg",
      "static/images/photo_2025-01-25_00-43-42 (1).jpg",
      "static/images/photo_2025-01-25_00-43-43.jpg",
      "static/images/photo_2025-01-25_00-43-43 (1).jpg",
    ],
    grouped_id: 13901330800263338,
  };
  return (
    <div className={styles.container}>
      <Header></Header>

      <Card message={message}></Card>
      <Footer></Footer>
    </div>
  );
}
