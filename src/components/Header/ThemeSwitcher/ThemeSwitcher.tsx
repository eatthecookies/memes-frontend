import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../ThemeProvider";
const ThemeSwitcher = () => {
  const { changeTheme, theme } = useContext(ThemeContext);
  return (
    <div>
      <button onClick={changeTheme}>Сменить тему</button>
    </div>
  );
};

export default ThemeSwitcher;
