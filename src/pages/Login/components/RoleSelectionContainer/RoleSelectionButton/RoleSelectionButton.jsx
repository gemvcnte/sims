import React from "react";
import { Icon } from "@iconify/react";

function toPascalCase(str) {
  return str.replace(
    /(\w)(\w*)/g,
    (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
  );
}

function RoleSelectionButton({ role, hasBorder, onClick }) {
  const rolePascalCase = toPascalCase(role);

  return (
    <button
      className={`group flex transform-gpu justify-between px-2 py-[.75rem] transition-transform sm:py-4 ${
        hasBorder && "border-white-700 rounded-md border-b"
      }`}
      onClick={() => onClick(role)}
    >
      {rolePascalCase}
      <Icon
        icon="majesticons:arrow-up"
        width="24"
        height="24"
        rotate={1}
        className="text-black-400 transform-gpu transition-transform duration-300 group-hover:translate-x-2 group-focus:translate-x-4"
      />
    </button>
  );
}

export default RoleSelectionButton;
