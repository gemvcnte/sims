import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useSidebarContext } from "@/contexts/SidebarContext/index.jsx";
import { ToastContainer } from "react-toastify";
import { UserNav } from "@/components/user-nav";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTeacherAdminMode } from "@/hooks/useTeacherAdminMode";
import { useAuth } from "@/contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Topbar({ children }) {
  const { toggleSidebar } = useSidebarContext();

  const { isAdminMode, toggleMode } = useTeacherAdminMode();

  const { user } = useAuth();

  const handleKeyDown = (event) => {
    if ((event.altKey && event.key === "a") || event.key === "A") {
      toggleMode();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
        <span className="flex justify-center sm:gap-2">
          {user?.role === "admin" && (
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2 px-4">
                    <Switch
                      checked={isAdminMode}
                      onCheckedChange={toggleMode}
                    />
                    <Label>Admin Mode</Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle between Teacher Mode and Admin Mode</p>
                  <p>Shortcut: Alt + A</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <ModeToggle />
          <UserNav />
        </span>
      </header>
    </>
  );
}
