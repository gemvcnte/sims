import { Button } from "@/components/ui/button";
import React from "react";
import { SidebarFooterDropdown } from "./SidebarFooterDropdown";

export default function SidebarFooter() {
  return (
    <Button
      variant="ghost"
      className="mb-8 flex items-center justify-between py-8"
    >
      <section className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-foreground"></div>
        <div className="flex flex-col items-start justify-around">
          <span>Firstname Lastname</span>
          <span className="text-muted-foreground">role</span>
        </div>
      </section>
      <section>
        <SidebarFooterDropdown />
      </section>
    </Button>
  );
}
