import { Label } from "@/components/ui/label";
import React from "react";
import { InputField } from "../common";

export function EmploymentInformationSection({
  teacherProfile,
  handleInputChange,
}) {
  return (
    <section className="additional-information-section gap-4 p-4 sm:flex">
      <header className="mb-2 max-w-full text-center sm:max-w-[25%] sm:text-start md:max-w-[30%]">
        <h1 className="font-normal">Employment Information</h1>
        <p className="hidden text-sm font-thin text-muted-foreground sm:block">
          The section provides a comprehensive overview of the teacher's
          employment information.
        </p>
      </header>

      <main className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="tin" className="text-right text-xs sm:text-sm">
            TIN
          </Label>
          <InputField
            type="number"
            placeholder="Enter Your TIN number"
            value={teacherProfile?.tinNumber}
            onChange={(e) => handleInputChange("tinNumber", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="gsisNumber" className="text-right text-xs sm:text-sm">
            GSIS BP
          </Label>
          <InputField
            placeholder="Enter Your GSIS BP"
            value={teacherProfile?.gsisNumber}
            onChange={(e) => handleInputChange("gsisNumber", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="plantillaNumber"
            className="text-right text-xs sm:text-sm"
          >
            Plantilla Number
          </Label>
          <InputField
            placeholder="Enter Your Plantilla Number"
            value={teacherProfile?.plantillaNumber}
            onChange={(e) =>
              handleInputChange("plantillaNumber", e.target.value)
            }
          />
        </div>
      </main>
    </section>
  );
}
