import { useState } from "react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { Toaster } from "./components/ui/sonner";
// import Routes from "./routes";

function App() {
  return (
    <>
      <ToastContainer />
      {/* <Toaster /> */}
      <Toaster
        richColors
        closeButton="true"
        // duration="3000"
        position="top-right"
        toastOptions={{
          classNames: {
            description: "group-[.toast]:text-muted-foreground",
            actionButton:
              "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton: "group-[.toast]:bg-white group-[.toast]:text-black",
            error:
              "group toast group-[.toaster]:bg-red group-[.toaster]:text-red-600",
            success:
              "group toast group-[.toaster]:bg-green group-[.toaster]:text-green-600",
            warning:
              "group toast group-[.toaster]:bg-yellow group-[.toaster]:text-yellow-600 ",
            info: "group toast group-[.toaster]:bg-blue group-[.toaster]:text-blue-600 ",
          },
        }}
      />

      <AppRouter />
    </>
  );
}

export default App;
