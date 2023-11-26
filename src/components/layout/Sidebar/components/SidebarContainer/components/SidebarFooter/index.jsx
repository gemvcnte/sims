import { ModeToggle } from "@/components/ui/mode-toggle";
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
    <footer className="mb-8 flex justify-between">
      <button onClick={handleLogout}>logout</button>
      <ModeToggle />
    </footer>
  );
}
