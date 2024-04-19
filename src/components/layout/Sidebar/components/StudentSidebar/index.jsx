import React, { useState } from "react";
import SidebarContainer from "../SidebarContainer";
import SidebarItem from "@/components/layout/Sidebar/components/SidebarContainer/components/SidebarItem";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ViewTeacherAnnouncementsItem from "../TeacherSidebar/ViewTeacherAnnouncementsItem";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import ViewStudentAnnouncementsModal from "@/pages/Student/ViewStudentAnnouncementsModal";
import { Icon } from "@iconify/react";
import ChangePasswordDrawer from "../ChangePasswordDrawer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentSidebar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClick = (event) => {
    // event.preventDefault();
    setIsDialogOpen(!isDialogOpen);
  };

  const { logout } = useAuth();

  return (
    <SidebarContainer>
      <SidebarItem to="dashboard" icon="material-symbols:dashboard">
        Dashboard
      </SidebarItem>

      <SidebarItem to="schedule" icon="uil:schedule">
        Schedule
      </SidebarItem>

      <SidebarItem to="grades" icon="material-symbols:analytics-outline">
        Grades
      </SidebarItem>

      <DropdownMenuSeparator />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <span onClick={handleDialogClick}>
            <SidebarItem className="flex items-center gap-2 px-2">
              <Icon icon="mingcute:announcement-line" />
              <span className="">Announcements</span>
            </SidebarItem>
          </span>
        </DialogTrigger>
        <ViewStudentAnnouncementsModal onClose={handleDialogClick} />
      </Dialog>

      <SidebarItem to="profile" icon="teenyicons:user-outline">
        Profile
      </SidebarItem>

      <ChangePasswordDrawer userType="student" />

      <Button variant="ghost" className="w-full justify-start" onClick={logout}>
        <Icon icon="material-symbols:logout" className="mr-2" />
        Logout
      </Button>
    </SidebarContainer>
  );
}
