import React, { useEffect, useState } from "react";
import RoleSelectionContainer from "./components/RoleSelectionContainer";
import Header from "./components/Header";
import AnnouncementsModal from "./components/AnnouncementsModal";
import useAnnouncements from "./hooks/useAnnouncements";

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
      <RoleSelectionContainer />
    </>
  );
}

export default Login;
