import { Header } from "../components/Header/Header";
import styles from "./index.module.css";
import { Footer } from "../components/Footer/Footer";
import { Card } from "../components/UIkit/Card/Card";
import { useEffect, useState } from "react";
type MessageType = {
  message_id: number;
  text: string;
  timestamp: string;
  user_id: number;
  photos: string[];
  grouped_id: null | number;
};
export default function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [messagesNumber, setMessagesNumber] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(false);

  // Функция для получения сообщений
  const fetchMessages = async (page: number) => {
    try {
      setFetching(true); // Начинаем загрузку
      console.log("fetch", page);
      const offset = 20 * page;
      const response = await fetch(
        `https://mems-backend.onrender.com/messages?limit=20&offset=${offset}`
      );
      const data = await response.json();

      setMessagesNumber(data["total_count"]);
      setMessages((prevMessages) => [...prevMessages, ...data["messages"]]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!fetching) {
      fetchMessages(page);
    }
  }, [page]);

  useEffect(() => {
    const scrollHandler = (e: Event) => {
      const target = e.target as Document;
      const { scrollTop, scrollHeight } = target.documentElement;
      const windowHeight = window.innerHeight;
      if (
        scrollHeight - (scrollTop + windowHeight) < 100 &&
        messages.length < messagesNumber
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [messages.length, messagesNumber]);

  const cards = messages.map((message: MessageType, index: number) => (
    <Card key={index} message={message}></Card>
  ));

  return (
    <div className={styles.container}>
      <Header />
      {cards}
      <Footer />
    </div>
  );
}
