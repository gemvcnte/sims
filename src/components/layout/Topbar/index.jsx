import React from "react";
import { Icon } from "@iconify/react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useSidebarContext } from "@/contexts/SidebarContext/index.jsx";
import { ToastContainer } from "react-toastify";
import { UserNav } from "@/components/user-nav";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTeacherAdminMode } from "@/hooks/useTeacherAdminMode";
import { useAuth } from "@/contexts/AuthContext";

export default function Topbar({ children }) {
  const { toggleSidebar } = useSidebarContext();

  const { isAdminMode, toggleMode } = useTeacherAdminMode();

  const { user } = useAuth();

  return (
    <>
      {/* <ToastContainer /> */}
      <header className="border-white-700 sticky top-0 z-50 mx-4 flex items-center justify-between border-b  bg-background/95 py-6 italic backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Icon
          icon="heroicons-outline:menu-alt-2"
          width="24"
          height="24"
          className="cursor-pointer lg:hidden"
          onClick={toggleSidebar}
        />
        <span>{children}</span>
        <span className="flex justify-center gap-2">
          {user.role === "admin" && (
            <div className="flex items-center space-x-2 px-4">
              <Switch checked={isAdminMode} onCheckedChange={toggleMode} />
              <Label>Admin Mode</Label>
            </div>
          )}

          <ModeToggle />
          <UserNav />
        </span>
      </header>
    </>
  );
}
