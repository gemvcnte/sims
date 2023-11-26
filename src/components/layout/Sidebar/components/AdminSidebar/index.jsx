import { StudentsDropdown } from "./StudentsDropdown";
import React from "react";
import SidebarContainer from "../SidebarContainer";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { TeachersDropdown } from "./TeachersDropdown";
import { useSidebarContext } from "@/contexts/SidebarContext.jsx";

export default function AdminSidebar() {
  const location = useLocation();
  const isOnRegistrationPage = location.pathname === "/registration";
  const { toggleSidebar } = useSidebarContext();

  return (
    !isOnRegistrationPage && (
      <SidebarContainer>
        <Link to="dashboard" onClick={toggleSidebar}>
          <Button variant="ghost" className="w-full justify-start">
            <Icon icon="material-symbols:dashboard" className="mr-2" />
            Dashboard
          </Button>
        </Link>

        <StudentsDropdown />
        <TeachersDropdown />
      </SidebarContainer>
    )
  );
}
