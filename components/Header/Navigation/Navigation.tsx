import styles from "./Navigation.module.css";
export function Navigation() {
  let menu = [
    {
      title: "Лента",
      url: "",
    },
    {
      title: "Галлерея",
      url: "",
    },
    {
      title: "Добавить свой мем",
      url: "",
    },
  ].map((item, index: number) => (
    <li key={index}>
      <a className={styles.navigationItems} href={item.url}>
        {item.title}
      </a>
    </li>
  ));
  return <ul className={styles.navigation}>{menu}</ul>;
}
