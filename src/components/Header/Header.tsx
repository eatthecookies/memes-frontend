import { Navigation } from "./Navigation/Navigation";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import styles from "./Header.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";
export function Header() {
  const { theme, _ } = useContext(ThemeContext);
  const style = {
    "--theme-bg": `${theme == "light" ? "white " : "black"}`,
    "--text-color": `${theme == "light" ? "black" : "white"}`,
  };
  return (
    <div className={styles.header} style={style}>
      <h1> Мемы v.1</h1>
      <nav>
        <Navigation />
      </nav>
      <ThemeSwitcher></ThemeSwitcher>
    </div>
  );
}
