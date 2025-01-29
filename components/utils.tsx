export function format_date(input_timestamp: string): string {
  const date = new Date(Date.parse(input_timestamp));
  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  // Функция для добавления ведущего нуля
  const pad = (num: number) => num.toString().padStart(2, "0");

  // Извлекаем компоненты даты
  const day = pad(date.getDate());
  const month = months[date.getMonth()]; // Месяц в виде строки
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  // Форматируем дату в нужный формат
  const formattedDate = `${day} ${month} в ${hours}:${minutes}`;
  return formattedDate;
}
