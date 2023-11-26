import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { SidebarFooterDropdown } from "./SidebarFooterDropdown";
import { jwtDecode } from "jwt-decode";

export default function SidebarFooter() {
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        const role = decodedToken.role;
        const username = decodedToken.username;

        setUserRole(role);
        setUsername(username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <Button
      variant="ghost"
      className="mb-8 flex items-center justify-between py-8"
    >
      <section className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-foreground"></div>
        <div className="flex flex-col items-start justify-around">
          <span>{username || "Firstname Lastname"}</span>
          <span className="text-muted-foreground">{userRole}</span>
        </div>
      </section>
      <section>
        <SidebarFooterDropdown />
      </section>
    </Button>
  );
}
