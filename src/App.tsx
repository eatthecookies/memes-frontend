import { Header } from "../components/Header/Header";
import styles from "./index.module.css";
import { Footer } from "../components/Footer/Footer";
import { Card } from "../components/UIkit/Card/Card";
import { useEffect, useState } from "react";

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
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

      // Обновляем количество сообщений и добавляем новые
      setMessagesNumber(data["total_count"]);
      setMessages((prevMessages) => [...prevMessages, ...data["messages"]]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setFetching(false); // Завершаем загрузку
    }
  };

  // useEffect для загрузки сообщений при изменении страницы
  useEffect(() => {
    if (!fetching) {
      fetchMessages(page); // Загружаем сообщения только если не в процессе загрузки
    }
  }, [page]); // зависимость от page, каждый раз при изменении страницы будем загружать новые сообщения

  useEffect(() => {
    const scrollHandler = (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          100 &&
        messages.length < messagesNumber
      ) {
        setPage((prevPage) => prevPage + 1); // Увеличиваем страницу при достижении конца страницы
      }
    };

    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler); // Очистка обработчика
    };
  }, [messages.length, messagesNumber]); // Эффект отслеживает изменение количества сообщений

  const cards = messages.map((message, index) => (
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
