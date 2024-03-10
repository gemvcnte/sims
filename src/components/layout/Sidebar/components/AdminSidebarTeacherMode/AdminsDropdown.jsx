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

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="w-full justify-between ">
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
            <DropdownMenuItem>
              <Link className="w-full" onClick={handleDialogClick}>
                Reset Admin Password
              </Link>
            </DropdownMenuItem>
          </DialogTrigger>
          <ResetPasswordModal onClose={setIsDialogOpen} userType="Admin" />
        </Dialog>

        <DropdownMenuItem>
          <Link
            to="create-admin-account"
            onClick={handleDropdownClick}
            className="w-full"
          >
            Create Admin Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link to="admins" onClick={handleDropdownClick} className="w-full">
            View All Admins
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
