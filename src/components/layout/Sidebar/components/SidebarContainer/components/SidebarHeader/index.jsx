import React from "react";
// import logo from "@/assets/sims-logo.svg";
import logo from "@/assets/sims-logo-img.svg";
import logoText from "@/assets/sims-logo-text.svg";

export default function SidebarHeader({}) {
  return (
    <header className="border-white-700 border-b py-8 text-center italic">
      {/* <span>SIMS v1.0</span> */}
      <div className="mx-auto flex max-w-[50%] gap-1">
        <img src={logo} alt="SIMS logo" className="max-w-[5ch]" />
        <img src={logoText} alt="SIMS logo" className="max-w-[10ch]" />
      </div>
    </header>
  );
}
