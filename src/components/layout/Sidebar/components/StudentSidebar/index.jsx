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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

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
            <SidebarItem className="flex items-center gap-2">
              <Icon icon="mingcute:announcement-line" />
              <span className="ml-2">View Announcements</span>
            </SidebarItem>
          </span>
        </DialogTrigger>
        <ViewStudentAnnouncementsModal onClose={handleDialogClick} />
      </Dialog>

      <SidebarItem to="profile" icon="teenyicons:user-outline">
        Profile
      </SidebarItem>

      <Drawer>
        <DrawerTrigger>
          <Button variant="ghost" className="w-full justify-start">
            <Icon icon="mdi:password-outline" className="mr-2" />
            Password
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sm:mx-auto sm:max-w-[500px]">
            <DrawerTitle>Update Password</DrawerTitle>
            <DrawerDescription>
              We recommend updating your password regularly
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </SidebarContainer>
  );
}
