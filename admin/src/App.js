import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageRouter from "./router";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageRouter />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
