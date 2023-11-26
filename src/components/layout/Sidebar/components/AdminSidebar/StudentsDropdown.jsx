import React from "react";
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

export function StudentsDropdown({}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="w-full justify-between ">
          <span className="flex items-center">
            <Icon icon="ph-student" className="mr-2" />
            Students
          </span>
          <span>
            <Icon icon="gridicons:dropdown" className="mr-2" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Students</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Create Student Account</DropdownMenuItem>

        <DropdownMenuItem>Update Student Password</DropdownMenuItem>

        <DropdownMenuItem>
          <Link to="registration" target="_blank" className="w-full">
            Student Registration Form
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link to="student-application-monitoring" className="w-full">
            Student Application Monitoring
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
