import React from "react";
import { useEnrollment } from "../../useEnrollment";

export default function Header() {
  const { step, hasAccount } = useEnrollment();

  if (!step || step === 0 || hasAccount) return null;

  return (
    <header className=" flex justify-between">
      <div
        className={`flex w-full items-center justify-center gap-2 bg-primary px-2 py-2 ${
          step === 1 ? "rounded-br-full rounded-tr-full" : ""
        } text-background md:px-16 md:py-4`}
      >
        <span
          className={`hidden h-8 w-8 rounded-full bg-background p-1 text-center text-foreground sm:block`}
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
        } ${step !== 1 ? "bg-primary text-background" : ""}`}
      >
        <span
          className={`hidden h-8 w-8 rounded-full bg-muted p-1 text-center sm:block ${
            step !== 1 ? "bg-background text-foreground" : ""
          }`}
        >
          2
        </span>
        <span>Parent's/Guardian's Information</span>
      </div>
      <div
        className={`flex w-full items-center justify-center gap-2 px-2 py-2 md:px-16 md:py-4 ${
          step === 3 ? "bg-primary text-background" : ""
        }`}
      >
        <span
          className={`hidden h-8 w-8 rounded-full bg-muted p-1 text-center sm:block ${
            step === 3 ? "bg-background text-foreground" : ""
          }`}
        >
          3
        </span>
        <span>Academic Information</span>
      </div>
    </header>
  );
}
