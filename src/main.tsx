import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { worker } from "./mocks/browser";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthTemplate from "./layouts/Auth";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/Error";
import AssessmentPage, {
  loader as assessmentsLoader,
} from "./pages/Assessment";
import SignUpPage, { action as signUpAction } from "~/pages/Signup";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    action: signUpAction,
  },
  {
    path: "/success",
    element: <h1>success sign up</h1>,
  },
  {
    path: "/",
    element: <AuthTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "assessments",
        element: <AssessmentPage />,
        loader: assessmentsLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
