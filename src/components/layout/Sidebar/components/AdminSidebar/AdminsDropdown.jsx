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

export function AdminsDropdown({}) {
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
    "/admins",
    "/create-admin-account",
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
            Admins
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
        <DropdownMenuLabel>Admins</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Link className="w-full" onClick={handleDialogClick}>
              <ButtonDropdownItem>Reset Admin Password</ButtonDropdownItem>
            </Link>
          </DialogTrigger>
          <ResetPasswordModal onClose={setIsDialogOpen} userType="Admin" />
        </Dialog>

        <Link
          to="create-admin-account"
          onClick={handleDropdownClick}
          className="w-full"
        >
          <ButtonDropdownItem>Create Admin Account</ButtonDropdownItem>
        </Link>

        <Link to="admins" onClick={handleDropdownClick} className="w-full">
          <ButtonDropdownItem>View All Admins</ButtonDropdownItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
