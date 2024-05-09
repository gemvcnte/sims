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

  const isActiveClasses = useActiveClasses([
    "/archived/students",
    "/archived/teachers",
    "/archived/admins",
  ]);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className={`w-full justify-between ${isActiveClasses}`}
        >
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

        <Link
          to="archived/students"
          onClick={handleDropdownClick}
          className="w-full"
        >
          <ButtonDropdownItem>Student Accounts</ButtonDropdownItem>
        </Link>

        <Link
          to="archived/teachers"
          onClick={handleDropdownClick}
          className="w-full"
        >
          <ButtonDropdownItem>Teacher Accounts</ButtonDropdownItem>
        </Link>

        <Link
          to="archived/admins"
          onClick={handleDropdownClick}
          className="w-full"
        >
          <ButtonDropdownItem>Admin Accounts</ButtonDropdownItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
