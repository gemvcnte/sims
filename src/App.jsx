import { useState } from "react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
// import Routes from "./routes";

function App() {
  return (
    <>
      <ToastContainer />
      <AppRouter />
    </>
  );
}

export default App;
