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
    if ((event.ctrlKey && event.key === "m") || event.key === "M") {
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
                    <Label className="align-center flex items-center gap-2">
                      <span>Admin Mode</span>
                      <kbd className="pointer-events-none  hidden h-5 w-fit select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>M
                      </kbd>
                    </Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle between Teacher Mode and Admin Mode</p>
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
