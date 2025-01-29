import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource/roboto";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
