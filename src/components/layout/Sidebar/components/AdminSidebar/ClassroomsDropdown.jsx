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
import CreateNewSection from "@/pages/Admin/CreateNewSection";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import useActiveClasses from "@/hooks/useActiveClasses";

export function ClassroomsDropdown({}) {
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
    "/all-classes",
    /^\/all-classes\//,
  ]);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className={`w-full justify-between ${isActiveClasses}`}
        >
          <span className="flex items-center">
            <Icon icon="mdi:google-classroom" className="mr-2" />
            Sections
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
        <DropdownMenuLabel>Sections</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* <DropdownMenuItem>
          <Link onClick={handleDropdownClick} to="classes">
            My Sections
          </Link>
        </DropdownMenuItem> */}

        <button className="relative flex w-full cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
          <Link onClick={handleDropdownClick} to="all-classes">
            View All Sections
          </Link>
        </button>

        {/* <DropdownMenuItem>
          <Link onClick={handleDropdownClick}>View Section Schedule</Link>
        </DropdownMenuItem> */}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <Link onClick={handleDialogClick}>Create New Section</Link>
            </button>
          </DialogTrigger>
          <CreateNewSection onClose={handleDialogClick} />
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
