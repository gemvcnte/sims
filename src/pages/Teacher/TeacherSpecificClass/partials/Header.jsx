import React from "react";
import ClassNav from "./ClassNav";
import { useNavigate } from "react-router-dom";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const navigate = useNavigate();

  const navigateToClasses = () => {
    navigate("/classes");
  };

  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  if (loading) {
    return (
      <Skeleton className="m-4 flex items-center justify-between">
        <Skeleton className="p-4 hover:cursor-pointer"></Skeleton>
      </Skeleton>
    );
  }

  return (
    <header className="flex items-center justify-between">
      <ClassNav />
      <Button
        variant="ghost"
        className="group -mb-4 mr-4 p-4 hover:cursor-pointer"
        onClick={navigateToClasses}
      >
        <ChevronLeft className="mr-2 inline-block text-muted-foreground transition-all duration-300  group-hover:mr-4" />

        <span className="hidden text-sm text-muted-foreground sm:inline">
          View My Sections
        </span>
      </Button>
    </header>
  );
}
