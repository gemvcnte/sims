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

export default function StudentSidebar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClick = (event) => {
    // event.preventDefault();
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <SidebarContainer>
      <SidebarItem to="dashboard" icon="material-symbols:dashboard">
        Dashboard
      </SidebarItem>

      <SidebarItem to="" icon="uil:schedule">
        Schedule
      </SidebarItem>

      <SidebarItem to="" icon="material-symbols:analytics-outline">
        Grades
      </SidebarItem>

      <DropdownMenuSeparator />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <SidebarItem>
            <Link onClick={handleDialogClick}>View Announcements</Link>
          </SidebarItem>
        </DialogTrigger>
        <ViewStudentAnnouncementsModal onClose={handleDialogClick} />
      </Dialog>

      <SidebarItem to="profile" icon="teenyicons:user-outline">
        Profile
      </SidebarItem>
    </SidebarContainer>
  );
}
