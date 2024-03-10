import { Button } from "@/components/ui/button";
import { SidebarFooterDropdown } from "./SidebarFooterDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SidebarFooter() {
  const { user, logout } = useAuth();
  const { toggleSidebar } = useSidebarContext();

  if (!user) {
    return null;
  }

  const displayText = user?.username || "";
  const abbreviatedText = displayText.slice(0, 2).toUpperCase();

  return (
    <Link
      to="profile"
      onClick={() => toggleSidebar()}
      className="block lg:hidden"
    >
      <Button
        variant="ghost"
        className="mb-8 flex w-full items-center justify-between py-8"
      >
        <section className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="avatar" />
            <AvatarFallback>{abbreviatedText}</AvatarFallback>
          </Avatar>{" "}
          <div className="flex flex-col items-start justify-around">
            <span>
              {user?.username && user.username.length > 12
                ? `${user.username.slice(0, 12)}..`
                : user.username || "username"}
            </span>
            <span className="text-muted-foreground">{user?.role}</span>
          </div>
        </section>
        <section>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              logout();
            }}
          >
            <Icon
              icon="material-symbols:logout"
              rotate={2}
              width="20"
              height="20"
              className="z-20 ml-4 text-muted-foreground"
            />
          </Button>
        </section>
      </Button>
    </Link>
  );
}
