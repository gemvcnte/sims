import React, { useState } from "react";
import { Link } from "react-router-dom";
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

export function TeachersDropdown({}) {
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
    "/teachers",
    "/create-teacher-account",
  ]);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className={`w-full justify-between ${isActiveClasses}`}
        >
          <span className="flex items-center">
            <Icon icon="mdi:teacher" className="mr-2" />
            Teachers
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
        <DropdownMenuLabel>Teachers</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Link className="w-full" onClick={handleDialogClick}>
              <ButtonDropdownItem>Reset Teacher Password</ButtonDropdownItem>
            </Link>
          </DialogTrigger>
          <ResetPasswordModal onClose={setIsDialogOpen} userType="Teacher" />
        </Dialog>

        <Link
          to="create-teacher-account"
          onClick={handleDropdownClick}
          className="w-full"
        >
          <ButtonDropdownItem>Create Teacher Account</ButtonDropdownItem>
        </Link>

        <Link to="teachers" onClick={handleDropdownClick} className="w-full">
          <ButtonDropdownItem>View All Teachers</ButtonDropdownItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
