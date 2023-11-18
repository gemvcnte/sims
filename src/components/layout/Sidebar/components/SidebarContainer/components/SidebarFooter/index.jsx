import React from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarFooter() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <footer className="mb-8">
      <button onClick={handleLogout}>logout</button>
    </footer>
  );
}
