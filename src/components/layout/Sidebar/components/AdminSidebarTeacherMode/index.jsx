import { StudentsDropdown } from "./StudentsDropdown";
import React, { useState } from "react";
import SidebarContainer from "../SidebarContainer";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { TeachersDropdown } from "./TeachersDropdown";
import { useSidebarContext } from "@/contexts/SidebarContext/index.jsx";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ClassroomsDropdown } from "./ClassroomsDropdown";
import { AnnouncementsDropdown } from "./AnnouncementsDropdown";
import SidebarItem from "../SidebarContainer/components/SidebarItem";
import { AdminsDropdown } from "./AdminsDropdown";
import ChangePasswordDrawer from "../ChangePasswordDrawer";
import AnalyticsDrawer from "@/pages/Admin/AnalyticsDrawer";
import { GlobalSetttingsDrawer } from "@/pages/Admin/GlobalSettingsDrawer";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Global } from "recharts";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTeacherAdminMode } from "@/hooks/useTeacherAdminMode";
import { useAuth } from "@/contexts/AuthContext";
import useActiveClasses from "@/hooks/useActiveClasses";

export default function AdminSidebarTeacherMode() {
  const location = useLocation();
  const isOnRegistrationPage = location.pathname === "/registration";
  const { toggleSidebar } = useSidebarContext();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerClick = (event) => {
    // event.preventDefault();
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { isAdminMode, toggleMode } = useTeacherAdminMode();

  const { logout } = useAuth();

  const isActiveClasses = useActiveClasses(["/class", /^\/class\//]);

  return (
    !isOnRegistrationPage &&
    !isAdminMode && (
      <SidebarContainer overflow={false}>
        {/* <div className="flex items-center space-x-2 px-4">
          <Switch checked={isAdminMode} onCheckedChange={toggleMode} />
          <Label>Admin Mode</Label>
        </div> */}

        <SidebarItem to="dashboard" icon="material-symbols:dashboard">
          Dashboard
        </SidebarItem>

        <SidebarItem
          to="classes"
          icon="mdi:google-classroom"
          className={isActiveClasses}
        >
          Classes
        </SidebarItem>

        {/* <StudentsDropdown />
        <TeachersDropdown />
        <ClassroomsDropdown />
        <AdminsDropdown /> */}

        <DropdownMenuSeparator />

        <AnnouncementsDropdown />

        {/* <AnalyticsDrawer /> */}

        <SidebarItem to="profile" icon="teenyicons:user-outline">
          Profile
        </SidebarItem>

        <ChangePasswordDrawer userType="admin" />

        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={logout}
        >
          <Icon icon="material-symbols:logout" className="mr-2" />
          Logout
        </Button>
      </SidebarContainer>
    )
  );
}