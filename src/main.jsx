import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      wave={{
        disabled: true,
      }}
      theme={{
        components: {
          Layout: {
            headerBg: "#ffffff",
          },
        },
        token: {
          // Seed Token
          colorPrimary: "#c92420",
          borderRadius: 2,

          // Alias Token
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
