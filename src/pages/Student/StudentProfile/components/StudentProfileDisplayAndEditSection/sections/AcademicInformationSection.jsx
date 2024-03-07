import { Label } from "@/components/ui/label";
import React from "react";
import { InputField } from "../common";

export function AcademicInformationSection({
  studentProfile,
  handleInputChange,
}) {
  return (
    <section className="academic-information-section p-4 sm:flex">
      <header className="mb-2 text-center md:max-w-[30%] md:text-start ">
        <h1 className="font-normal">Academic Information</h1>
        <p className="hidden text-sm font-thin text-muted-foreground sm:block">
          The academic section provides a comprehensive overview of the
          student's academic information.
        </p>
      </header>

      <main className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lrn" className="text-right text-xs sm:text-sm">
            LRN
          </Label>
          <InputField
            disabled={true}
            type="number"
            placeholder="Input Your LRN"
            value={studentProfile?.lrn}
            onChange={(e) => handleInputChange("lrn", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="schoolYear" className="text-right text-xs sm:text-sm">
            School Year
          </Label>
          <select
            disabled={true}
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="schoolYear"
            value={studentProfile?.schoolYear[0].year}
            onChange={(e) => handleInputChange("schoolYear", e.target.value)}
          >
            <option value="">Select School Year</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
            <option value="2027-2028">2027-2028</option>
            <option value="2028-2029">2028-2029</option>
            <option value="2029-2030">2029-2030</option>
          </select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="semester" className="text-right text-xs sm:text-sm">
            Semester
          </Label>
          <select
            disabled={true}
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="semester"
            value={studentProfile?.schoolYear[0].semester}
            onChange={(e) => handleInputChange("semester", e.target.value)}
          >
            <option value="">Select Semester</option>
            <option value="first semester">1st Semester</option>
            <option value="second semester">2nd Semester</option>
          </select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="track" className="text-right text-xs sm:text-sm">
            Track
          </Label>
          <select
            disabled={true}
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="track"
            value={studentProfile?.schoolYear[0].track}
            onChange={(e) => handleInputChange("track", e.target.value)}
          >
            <option value="">Select Track</option>
            <option value="ACADEMIC">Academic Track</option>
            <option value="TVL">TVL Track</option>
          </select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="strand" className="text-right text-xs sm:text-sm">
            Strand
          </Label>
          <select
            disabled={true}
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="strand"
            value={studentProfile?.schoolYear[0].strand}
            onChange={(e) => handleInputChange("strand", e.target.value)}
          >
            <option value="">Select Strand</option>
            <option value="ABM">ABM</option>
            <option value="HUMSS">HUMSS</option>
            <option value="STEM">STEM</option>
            <option value="ICT">ICT</option>
            <option value="HE">HE</option>
          </select>
        </div>
      </main>
    </section>
  );
}
