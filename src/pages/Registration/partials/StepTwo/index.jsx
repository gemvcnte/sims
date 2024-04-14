import React from "react";
import { useEnrollment } from "../../useEnrollment";
import { ChevronRight } from "lucide-react";

export default function StepTwo() {
  const { step, nextStep, prevStep, enrollmentData, setEnrollmentData } =
    useEnrollment();

  if (step !== 2) return null;

  return (
    <>
      <div>this is the step 2</div>
      <section className="flex items-end justify-end pb-8">
        <button
          onClick={() => prevStep()}
          className="mr-4 rounded-lg border border-muted px-12 py-4 text-right hover:border-primary hover:text-primary"
        >
          Back
        </button>
        <button
          type="submit"
          className="group flex w-fit transform-gpu items-center gap-2 rounded-lg bg-primary px-12 py-4 text-right text-primary-foreground transition-transform hover:-translate-x-[-16px] focus:-translate-x-[-16px] focus:outline-none"
        >
          Next Step
          <ChevronRight
            className="transform-gpu transition-transform duration-300 group-hover:translate-x-8 group-focus:translate-x-8"
            color="white"
            rotate={1}
          />
        </button>
      </section>
      ;
    </>
  );
}
