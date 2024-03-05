import React from "react";
import ClassNav from "./ClassNav";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const navigateToClasses = () => {
    navigate("/classes");
  };

  return (
    <header className="flex items-center justify-between">
      <ClassNav />
      <div className="p-4 hover:cursor-pointer" onClick={navigateToClasses}>
        <Icon
          icon="octicon:arrow-down-24"
          rotate={1}
          className="mr-2 inline-block text-muted-foreground"
        />
        <span className="hidden text-sm text-muted-foreground sm:inline">
          View My Sections
        </span>
      </div>
    </header>
  );
}
