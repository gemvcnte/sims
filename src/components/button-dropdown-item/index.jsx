import React from "react";

export default function ButtonDropdownItem({ children }) {
  return (
    <button className="relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
      {children}
    </button>
  );
}
