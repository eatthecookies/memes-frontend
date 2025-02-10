import React from "react";
import ContextProvider from "./ThemeProvider";
import App from "./App";
const Root = () => {
  return (
    <ContextProvider>
      <App></App>
    </ContextProvider>
  );
};

export default Root;
