import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { useEffect } from "react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleKeyDown = (event) => {
    if (
      (event.altKey && event.key === "w") ||
      (event.altKey && event.key === "W")
    ) {
      toggleTheme();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
    >
      {theme === "light" ? (
        <TooltipProvider delayDuration={10}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Sun className="h-[1rem] w-[1rem]" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch to Dark Mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider delayDuration={10}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Moon className="h-[1rem] w-[1rem]" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch to Light Mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
