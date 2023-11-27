import React from "react";
import SidebarContainer from "../SidebarContainer";
import SidebarItem from "../SidebarContainer/components/SidebarItem";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function TeacherSidebar() {
  return (
    <SidebarContainer>
      <SidebarItem to="dashboard" icon="material-symbols:dashboard">
        Dashboard
      </SidebarItem>

      <SidebarItem to="" icon="uil:schedule">
        Schedule
      </SidebarItem>

      <SidebarItem to="" icon="mdi:google-classroom">
        Classes
      </SidebarItem>

      <SidebarItem to="" icon="material-symbols:analytics-outline">
        Grades
      </SidebarItem>

      <DropdownMenuSeparator />

      <SidebarItem to="" icon="mingcute:announcement-line">
        Announcements
      </SidebarItem>
    </SidebarContainer>
  );
}
