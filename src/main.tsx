import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter/index.css";
import "@fontsource/roboto/index.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
