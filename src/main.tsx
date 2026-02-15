import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "@/store";
import App from './App.tsx'
import "./styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        hashed: false,
        token: {
          fontFamily: "Inter, sans-serif",
          fontSize: 18,
          borderRadius: 12,
          colorPrimary: "#242EDB"
        }
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
