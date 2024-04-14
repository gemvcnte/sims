import React, { useEffect, useState } from "react";
import { useEnrollment } from "../../useEnrollment";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { BadgeCheck, UserRoundCheck, UserRoundX } from "lucide-react";

export default function StepZero() {
  const { step, nextStep, hasAccount, setHasAccount } = useEnrollment();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(false);
  }, [hasAccount]);

  const handleNextStep = () => {
    if (hasAccount === null) {
      setShowError(true);
      return;
    }

    nextStep();
  };

  return (
    step === 0 && (
      <main className="flex h-[100svh] flex-col items-center justify-center gap-2">
        <section className="flex gap-8">
          <Card
            className={`flex aspect-square w-[35ch] cursor-pointer flex-col hover:border-primary hover:text-primary 
          ${hasAccount ? "border-primary text-primary" : ""} 
          ${showError ? "border-red-500 text-red-500" : ""}`}
            onClick={() => setHasAccount(true)}
          >
            <CardTitle className="flex justify-end p-2">
              <BadgeCheck
                className={`text-primary ${
                  hasAccount ? "opacity-100" : "opacity-0"
                }`}
              />
            </CardTitle>
            <CardContent
              className={`flex h-full flex-col items-center justify-center gap-2 text-center`}
            >
              <UserRoundCheck className="h-12 w-12" />
              <span>I have a SIMS account from previous semesters</span>
            </CardContent>
          </Card>

          <Card
            className={`flex aspect-square w-[35ch] cursor-pointer flex-col hover:border-primary hover:text-primary
          ${
            !hasAccount && hasAccount !== null
              ? "border-primary text-primary"
              : ""
          } 
          ${showError ? "border-red-500 text-red-500 " : ""}`}
            onClick={() => setHasAccount(false)}
          >
            <CardTitle className="flex justify-end p-2">
              <BadgeCheck
                className={`text-primary ${
                  !hasAccount && hasAccount !== null
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </CardTitle>
            <CardContent
              className={`flex h-full flex-col items-center justify-center gap-2 text-center `}
            >
              <UserRoundX className="h-12 w-12" />
              <span>I'm new to SIMS and don't have an account yet</span>
            </CardContent>
          </Card>
        </section>

        {showError && (
          <p className="mt-8 text-red-500">
            Please select if you have a SIMS account from previous semesters
          </p>
        )}

        <section className="flex w-[70ch] items-end justify-end pt-8">
          <button
            className="group flex w-fit transform-gpu items-center gap-2 rounded-lg bg-primary px-16 py-4 text-right text-white transition-transform hover:-translate-x-[-16px] focus:-translate-x-[-16px] focus:outline-none"
            onClick={handleNextStep}
          >
            Next Step
            <Icon
              className="transform-gpu transition-transform duration-300 group-hover:translate-x-8 group-focus:translate-x-8"
              icon="ep:arrow-up-bold"
              color="white"
              rotate={1}
            />
          </button>
        </section>
      </main>
    )
  );
}
