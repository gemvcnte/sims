import { useSidebarContext } from "@/contexts/SidebarContext/index.jsx";
import React from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SidebarItem({ to, icon, children, className }) {
  const { toggleSidebar } = useSidebarContext();

  const location = useLocation();
  const isActive = location.pathname === `/${to}`; // Prepend "/" to "to"

  // Conditionally apply classes based on isActive
  const isActiveClasses = isActive ? "bg-primary text-white" : "";

  return (
    <Link to={to} onClick={toggleSidebar}>
      <Button
        variant="ghost"
        className={`w-full justify-start ${isActiveClasses} ${className}`}
      >
        <Icon icon={icon} className="mr-2" />
        {children}
      </Button>
    </Link>
  );
}
