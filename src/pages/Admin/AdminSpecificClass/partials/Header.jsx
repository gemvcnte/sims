import React from "react";
import ClassNav from "./ClassNav";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const navigate = useNavigate();

  const navigateToClasses = () => {
    navigate("/all-classes");
  };

  return (
    <header className="flex items-center justify-between">
      <ClassNav />
      <Button
        variant="ghost"
        className="group -mb-4 mr-2 p-4 hover:cursor-pointer sm:mr-4"
        onClick={navigateToClasses}
      >
        <ChevronLeft className="mr-2 inline-block text-muted-foreground transition-all duration-300  group-hover:mr-4" />
        <span className="hidden text-sm text-muted-foreground sm:inline">
          View All Sections
        </span>
      </Button>
    </header>
  );
}
