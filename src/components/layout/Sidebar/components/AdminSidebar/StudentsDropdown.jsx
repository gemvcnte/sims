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

export function StudentsDropdown({}) {
  const { toggleSidebar } = useSidebarContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    toggleSidebar();
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="w-full justify-between ">
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
        <DropdownMenuItem>
          <Link onClick={handleDropdownClick} className="w-full">
            Create Student Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link onClick={handleDropdownClick} className="w-full">
            Update Student Password
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

        <DropdownMenuItem>
          <Link
            onClick={handleDropdownClick}
            to="student-application-monitoring"
            className="w-full"
          >
            Student Application Monitoring
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
