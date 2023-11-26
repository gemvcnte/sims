import { StudentsDropdown } from "./StudentsDropdown";
import React from "react";
import SidebarContainer from "../SidebarContainer";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { TeachersDropdown } from "./TeachersDropdown";
import { useSidebarContext } from "@/contexts/SidebarContext.jsx";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ClassroomsDropdown } from "./ClassroomsDropdown";
import { AnnouncementsDropdown } from "./AnnouncementsDropdown";
import SidebarItem from "./SidebarItem";

export default function AdminSidebar() {
  const location = useLocation();
  const isOnRegistrationPage = location.pathname === "/registration";
  const { toggleSidebar } = useSidebarContext();

  return (
    !isOnRegistrationPage && (
      <SidebarContainer>
        <SidebarItem to="dashboard" icon="material-symbols:dashboard">
          Dashboard
        </SidebarItem>

        <StudentsDropdown />
        <TeachersDropdown />
        <ClassroomsDropdown />

        <DropdownMenuSeparator />

        <AnnouncementsDropdown />

        <SidebarItem icon="material-symbols:analytics-outline">
          Analytics
        </SidebarItem>
      </SidebarContainer>
    )
  );
}
