import React from "react";

import { cn } from "@/lib/utils";

function ClassNav({ className, ...props }) {
  return (
    <nav
      className={cn("flex items-center space-x-4 p-4 lg:space-x-6", className)}
      {...props}
    >
      <a
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Students
      </a>
      <a
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Subjects
      </a>
      <a
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Schedule
      </a>
    </nav>
  );
}

export default ClassNav;
