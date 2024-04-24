import { useState } from "react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { Toaster } from "./components/ui/sonner";
// import Routes from "./routes";

function App() {
  return (
    <>
      <ToastContainer />
      <Toaster />
      <AppRouter />
    </>
  );
}

export default App;
