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

import CreateClassAnnouncementItem from "./CreateClassAnnouncementItem";
import CreatePublicAnnouncementItem from "./CreatePublicAnnouncementItem";
import ViewTeacherAnnouncementsItem from "../TeacherSidebar/ViewTeacherAnnouncementsItem";

export function AnnouncementsDropdown({}) {
  const { toggleSidebar } = useSidebarContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    toggleSidebar();
  };

  const handleDialogClick = (event) => {
    // event.preventDefault();
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="w-full justify-between ">
          <span className="flex items-center">
            <Icon icon="mingcute:announcement-line" className="mr-2" />
            Announcements
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
        <DropdownMenuLabel>Announcements</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="flex flex-col">
          {/* <CreatePublicAnnouncementItem handleDialogClick={handleDialogClick} /> */}

          <CreateClassAnnouncementItem handleDialogClick={handleDialogClick} />

          <ViewTeacherAnnouncementsItem />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
