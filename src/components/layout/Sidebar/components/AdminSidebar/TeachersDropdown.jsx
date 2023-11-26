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

export function TeachersDropdown({}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="w-full justify-between ">
          <span className="flex items-center">
            <Icon icon="mdi:teacher" className="mr-2" />
            Teachers
          </span>
          <span>
            <Icon icon="gridicons:dropdown" className="mr-2" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Teachers</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Create Teacher Account</DropdownMenuItem>
        <DropdownMenuItem>Update Teacher Password</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
