import React from "react";
import SidebarContainer from "../SidebarContainer";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import SidebarItem from "@/components/layout/Sidebar/components/SidebarContainer/components/SidebarItem";

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

      <SidebarItem to="profile" icon="teenyicons:user-outline">
        Profile
      </SidebarItem>
    </SidebarContainer>
  );
}
