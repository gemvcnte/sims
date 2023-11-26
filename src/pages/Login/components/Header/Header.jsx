import React from "react";
import logo from "../../../../assets/mrmnhs-logo.png";

function Header() {
  return (
    <header className="mt-8">
      <div className="flex flex-col items-center gap-2 pt-8 ">
        <img src={logo} alt="" className="max-w-[12rem]" />
        <h1 className="max-w-[80%] text-center sm:max-w-full">
          Marciano del Rosario Memorial National High School
        </h1>
        <h2 className="text-sm text-black-300 sm:text-[1rem] ">
          Student Information Management System
        </h2>
      </div>
    </header>
  );
}

export default Header;
