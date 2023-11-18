import React from "react";

export default function Header({ step }) {
  return (
    <header className=" flex justify-between bg-white-500">
      <div
        className={`flex w-full items-center justify-center gap-2 bg-blue-400 px-2 py-2 ${
          step === 1 ? "rounded-br-full rounded-tr-full" : ""
        } text-white-400 md:px-16 md:py-4`}
      >
        <span
          className={`hidden h-8 w-8 rounded-full bg-white-400 p-1 text-center text-black-400 sm:block`}
        >
          1
        </span>
        <span>Learner Information</span>
      </div>
      <div
        className={`flex w-full items-center justify-center gap-2 ${
          step !== 2
            ? "rounded-br-none rounded-tr-none"
            : "rounded-br-full rounded-tr-full"
        } ${step !== 1 ? "bg-blue-400 text-white-400" : ""}`}
      >
        <span
          className={`hidden h-8 w-8 rounded-full bg-black-300 p-1 text-center sm:block ${
            step !== 1 ? "bg-white-400 text-black-400" : ""
          }`}
        >
          2
        </span>
        <span>Parent's/Guardian's Information</span>
      </div>
      <div
        className={`flex w-full items-center justify-center gap-2 px-2 py-2 md:px-16 md:py-4 ${
          step === 3 ? "bg-blue-400 text-white-400" : ""
        }`}
      >
        <span
          className={`hidden h-8 w-8 rounded-full bg-black-300 p-1 text-center sm:block ${
            step === 3 ? "bg-white-400 text-black-400" : ""
          }`}
        >
          3
        </span>
        <span>Academic Information</span>
      </div>
    </header>
  );
}
