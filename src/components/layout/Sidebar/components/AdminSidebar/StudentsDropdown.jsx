import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebarContext } from "@/contexts/SidebarContext/index.jsx";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ResetPasswordModal from "@/components/reset-password-modal";
import useActiveClasses from "@/hooks/useActiveClasses";
import ButtonDropdownItem from "@/components/button-dropdown-item";

export function StudentsDropdown({}) {
  const { toggleSidebar } = useSidebarContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    toggleSidebar();
  };

  const handleDialogClick = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const isActiveClasses = useActiveClasses([
    "/students",
    "/student-enrollment-monitoring",
  ]);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className={`w-full justify-between ${isActiveClasses}`}
        >
          <span className="flex items-center">
            <Icon icon="ph-student" className="mr-2" />
            Students
          </span>
          <span>
            {!isDropdownOpen ? (
              <Icon icon="gridicons:dropdown" className="mr-2" />
            ) : (
              <Icon icon="gridicons:dropdown" className="mr-2" rotate={90} />
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Students</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <Link onClick={handleDropdownClick} className="w-full">
            Create Student Account
          </Link>
        </DropdownMenuItem> */}

        <Link
          onClick={handleDropdownClick}
          to="student-enrollment-monitoring"
          className="w-full"
        >
          <ButtonDropdownItem>Student Enrollment Monitoring</ButtonDropdownItem>
        </Link>

        <Link
          to="registration"
          // target="_blank"
          className="w-full"
          onClick={handleDropdownClick}
        >
          <ButtonDropdownItem>Student Enrollment Form</ButtonDropdownItem>
        </Link>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Link className="w-full" onClick={handleDialogClick}>
              <ButtonDropdownItem>Reset Student Password</ButtonDropdownItem>
            </Link>
          </DialogTrigger>
          <ResetPasswordModal onClose={setIsDialogOpen} userType="Student" />
        </Dialog>

        <Link onClick={handleDropdownClick} to="students" className="w-full">
          <ButtonDropdownItem>View All Students</ButtonDropdownItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
