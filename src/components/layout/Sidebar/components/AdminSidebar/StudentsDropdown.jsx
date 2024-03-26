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

  const location = useLocation();
  const isActive =
    location.pathname === `/students` ||
    location.pathname === `/student-application-monitoring`;

  // Conditionally apply classes based on isActive
  const isActiveClasses = isActive ? "bg-primary text-background" : "";

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

        <DropdownMenuItem>
          <Link
            onClick={handleDropdownClick}
            to="student-application-monitoring"
            className="w-full"
          >
            Student Application Monitoring
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            to="registration"
            // target="_blank"
            className="w-full"
            onClick={handleDropdownClick}
          >
            Student Registration Form
          </Link>
        </DropdownMenuItem>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Link className="w-full" onClick={handleDialogClick}>
                Reset Student Password
              </Link>
            </DropdownMenuItem>
          </DialogTrigger>
          <ResetPasswordModal onClose={setIsDialogOpen} userType="Student" />
        </Dialog>

        <DropdownMenuItem>
          <Link onClick={handleDropdownClick} to="students" className="w-full">
            View All Students
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
