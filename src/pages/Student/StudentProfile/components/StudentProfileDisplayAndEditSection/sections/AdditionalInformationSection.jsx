import { Label } from "@/components/ui/label";
import React from "react";
import { InputField } from "../common";

export function AdditionalInformationSection({
  studentProfile,
  handleInputChange,
}) {
  return (
    <section className="additional-information-section p-4 sm:flex">
      <header className="mb-2 text-center md:max-w-[30%] md:text-start ">
        <h1 className="font-normal">Additional Information</h1>
        <p className="hidden text-sm font-thin text-muted-foreground sm:block">
          The section provides a comprehensive overview of the student's
          additional information.
        </p>
      </header>

      <main className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="religion" className="text-right">
            Religion
          </Label>
          <InputField
            type="text"
            placeholder="Religion"
            value={studentProfile?.religion}
            onChange={(e) => handleInputChange("religion", e.target.value)}
            name="religion"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="province" className="text-right">
            Province
          </Label>
          <InputField
            type="text"
            placeholder='E.g. "Nueva Ecija"'
            value={studentProfile?.province}
            onChange={(e) => handleInputChange("province", e.target.value)}
            name="province"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="barangay" className="text-right">
            Barangay
          </Label>
          <InputField
            type="text"
            placeholder='E.g. "Pamaldan"'
            value={studentProfile?.barangay}
            onChange={(e) => handleInputChange("barangay", e.target.value)}
            name="barangay"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="city" className="text-right">
            City
          </Label>
          <InputField
            type="text"
            placeholder='E.g. "Cabanatuan City"'
            value={studentProfile?.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            name="city"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="zipCode" className="text-right">
            ZIP Code
          </Label>
          <InputField
            type="text"
            placeholder="ZIP Code"
            value={studentProfile?.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            name="zipCode"
          />
        </div>
      </main>
    </section>
  );
}
