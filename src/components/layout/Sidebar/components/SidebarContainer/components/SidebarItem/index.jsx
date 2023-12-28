import { useSidebarContext } from "@/contexts/SidebarContext/index.jsx";
import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SidebarItem({ to, icon, children }) {
  const { toggleSidebar } = useSidebarContext();

  return (
    <Link to={to} onClick={toggleSidebar}>
      <Button variant="ghost" className="w-full justify-start">
        <Icon icon={icon} className="mr-2" />
        {children}
      </Button>
    </Link>
  );
}
