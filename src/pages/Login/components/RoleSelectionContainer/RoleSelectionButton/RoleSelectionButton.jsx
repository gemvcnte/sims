import React from "react";
import { Icon } from "@iconify/react";

function RoleSelectionButton({ role, hasBorder, onClick }) {
  return (
    <button
      className={`group flex transform-gpu justify-between px-2 py-[.75rem] transition-transform sm:py-4 ${
        hasBorder && "rounded-md border-b border-white-700"
      }`}
      onClick={() => onClick(role)}
    >
      {role}
      <Icon
        icon="majesticons:arrow-up"
        width="24"
        height="24"
        rotate={1}
        className="transform-gpu text-black-400 transition-transform duration-300 group-hover:translate-x-2 group-focus:translate-x-4"
      />
    </button>
  );
}

export default RoleSelectionButton;
