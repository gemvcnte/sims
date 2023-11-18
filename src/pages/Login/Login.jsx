import React, { useEffect } from "react";
import RoleSelectionContainer from "./components/RoleSelectionContainer";
import Header from "./components/Header";

function Login() {
  useEffect(() => {
    document.body.style.backgroundColor = "var(--clr-white-400)";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <Header />
      <RoleSelectionContainer />
    </>
  );
}

export default Login;
