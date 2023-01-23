import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import theme from "./styles/theme";
import { worker } from "./mocks/browser";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster toastOptions={{ duration: 5000 }} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
