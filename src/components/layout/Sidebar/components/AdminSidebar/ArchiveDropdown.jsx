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

export function ArchiveDropdown({}) {
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
            <Icon icon="material-symbols:archive-outline" className="mr-2" />
            Archive
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
        <DropdownMenuLabel>Archived Accounts </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            to="archive/students"
            onClick={handleDropdownClick}
            className="w-full"
          >
            Student Accounts
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link to="admins" onClick={handleDropdownClick} className="w-full">
            Teachers Accounts
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link to="admins" onClick={handleDropdownClick} className="w-full">
            Admin Accounts
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
