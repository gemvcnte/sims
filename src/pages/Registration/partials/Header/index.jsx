import React from "react";
import { useEnrollment } from "../../useEnrollment";

export default function Header() {
  const { step } = useEnrollment();

  if (!step || step === 0) return null;

  return (
    <header className=" flex justify-between">
      <div
        className={`flex w-full items-center justify-center gap-2 bg-blue-400 px-2 py-2 ${
          step === 1 ? "rounded-br-full rounded-tr-full" : ""
        } text-white md:px-16 md:py-4`}
      >
        <span
          className={`hidden h-8 w-8 rounded-full bg-white p-1 text-center text-black sm:block`}
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
        } ${step !== 1 ? "bg-blue-400 text-white" : ""}`}
      >
        <span
          className={`bg-black-300 hidden h-8 w-8 rounded-full p-1 text-center sm:block ${
            step !== 1 ? "bg-white text-black" : ""
          }`}
        >
          2
        </span>
        <span>Parent's/Guardian's Information</span>
      </div>
      <div
        className={`flex w-full items-center justify-center gap-2 px-2 py-2 md:px-16 md:py-4 ${
          step === 3 ? "bg-blue-400 text-white" : ""
        }`}
      >
        <span
          className={`bg-black-300 hidden h-8 w-8 rounded-full p-1 text-center sm:block ${
            step === 3 ? "bg-white text-black" : ""
          }`}
        >
          3
        </span>
        <span>Academic Information</span>
      </div>
    </header>
  );
}
