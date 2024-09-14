import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/mainLayout/MainLayout.tsx";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MainLayout>
    </BrowserRouter>
  </React.StrictMode>
);
