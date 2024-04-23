import React, { useEffect, useState } from "react";
import RoleSelectionContainer from "./components/RoleSelectionContainer";
import Header from "./components/Header";
import AnnouncementsModal from "./components/AnnouncementsModal";
import useAnnouncements from "./hooks/useAnnouncements";
import LoginForm from "./components/RoleSelectionContainer/LoginForm";

function Login() {
  useEffect(() => {
    document.body.style.backgroundColor = "var(--clr-white-400)";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <AnnouncementsModal />

      <Header />
      <main className="-mt-8 px-8">
        <section className="mx-auto mt-12 flex max-w-[350px] flex-col gap-4 rounded-lg p-4">
          <LoginForm />
        </section>
      </main>
    </>
  );
}

export default Login;
