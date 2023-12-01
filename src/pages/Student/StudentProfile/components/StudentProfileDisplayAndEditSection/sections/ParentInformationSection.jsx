import { Label } from "@/components/ui/label";
import React from "react";
import { InputField } from "../common";

export function ParentInformationSection({
  studentProfile,
  handleInputChange,
}) {
  return (
    <section className="parent-information-section p-4 sm:flex">
      <header className="mb-2 text-center md:max-w-[30%] md:text-start ">
        <h1 className="font-normal">Parent/Guardian Information</h1>
        <p className="hidden text-sm font-thin text-muted-foreground sm:block">
          The parent/guardian section provides a comprehensive overview of the
          student's parent/guardian information.
        </p>
      </header>

      <main className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="fatherName" className="text-right">
            Father's Name
          </Label>
          <InputField
            disabled
            required
            type="text"
            placeholder="Firstname Middlename Lastname"
            value={studentProfile?.fatherName}
            onChange={(e) => handleInputChange("fatherName", e.target.value)}
            name="fatherName"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="motherName" className="text-right">
            Mother's Name
          </Label>
          <InputField
            disabled
            required
            type="text"
            placeholder="Firstname Middlename Lastname"
            value={studentProfile?.motherName}
            onChange={(e) => handleInputChange("motherName", e.target.value)}
            name="motherName"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="FatherContactNumber" className="text-right">
            Father's Tel. No.
          </Label>
          <InputField
            disabled
            required
            type="number"
            placeholder="+639xxxxxxxxx"
            value={studentProfile?.fatherContactNumber}
            onChange={(e) =>
              handleInputChange("fatherContactNumber", e.target.value)
            }
            name="fatherContactNumber"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="motherContactNumber" className="text-right">
            Mother's Tel. No.
          </Label>
          <InputField
            disabled
            required
            type="number"
            placeholder="+639xxxxxxxxx"
            value={studentProfile?.motherContactNumber}
            onChange={(e) =>
              handleInputChange("motherContactNumber", e.target.value)
            }
            name="motherContactNumber"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="guardianName" className="text-right">
            Guardian's Name
          </Label>
          <InputField
            type="text"
            placeholder="Firstname Middlename Lastname"
            value={studentProfile?.guardianName}
            onChange={(e) => handleInputChange("guardianName", e.target.value)}
            name="guardianName"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="guardianContactNumber" className="text-right">
            Guardian's Tel. No.
          </Label>
          <InputField
            type="number"
            placeholder="+639xxxxxxxxx"
            value={studentProfile?.guardianContactNumber}
            onChange={(e) =>
              handleInputChange("guardianContactNumber", e.target.value)
            }
            name="guardianContactNumber"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="guardianRelationship" className="text-right">
            Guardian Relationship
          </Label>
          <select
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            name="guardianRelationship"
            value={studentProfile?.guardianRelationship}
            onChange={(e) =>
              handleInputChange("guardianRelationship", e.target.value)
            }
          >
            <option value="">Relationship with Guardian</option>
            <option value="Parent">Parent</option>
            <option value="Relative">Relative</option>
            <option value="Non-relative">Non-relative</option>
          </select>
        </div>
      </main>
    </section>
  );
}
