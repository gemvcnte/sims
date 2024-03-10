import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
    >
      {theme === "light" ? (
        <Sun className="h-[1rem] w-[1rem]" />
      ) : (
        <Moon className="h-[1rem] w-[1rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
