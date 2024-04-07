import React from "react";
import SidebarContainer from "../SidebarContainer";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import SidebarItem from "@/components/layout/Sidebar/components/SidebarContainer/components/SidebarItem";
import { AnnouncementsDropdown } from "./AnnouncementsDropdown";
import ChangePasswordDrawer from "../ChangePasswordDrawer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react";
import useActiveClasses from "@/hooks/useActiveClasses";

export default function TeacherSidebar() {
  const { logout } = useAuth();

  const isActiveClasses = useActiveClasses([/^\/class\//]);

  return (
    <SidebarContainer>
      <SidebarItem to="dashboard" icon="material-symbols:dashboard">
        Dashboard
      </SidebarItem>

      <SidebarItem to="" icon="uil:schedule">
        Schedule
      </SidebarItem>

      <SidebarItem
        to="classes"
        icon="mdi:google-classroom"
        className={isActiveClasses}
      >
        Classes
      </SidebarItem>

      {/* <SidebarItem to="" icon="material-symbols:analytics-outline">
        Grades
      </SidebarItem> */}

      <DropdownMenuSeparator />

      <AnnouncementsDropdown />

      <SidebarItem to="profile" icon="teenyicons:user-outline">
        Profile
      </SidebarItem>

      <ChangePasswordDrawer userType="teacher" />

      <Button variant="ghost" className="w-full justify-start" onClick={logout}>
        <Icon icon="material-symbols:logout" className="mr-2" />
        Logout
      </Button>
    </SidebarContainer>
  );
}
