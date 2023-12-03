import { Label } from "@/components/ui/label";
import React from "react";
import { InputField } from "../common";

export function EducationalInformationSection({
  adminProfile,
  handleInputChange,
}) {
  return (
    <section className=" educational-information-section gap-4 break-words p-4 sm:flex">
      <header className="mb-2 text-center sm:max-w-[25%]  sm:text-start md:max-w-[30%] ">
        <h1 className="font-normal">Educational and Professional Details</h1>
        <p className="hidden text-sm font-thin text-muted-foreground sm:block">
          The educational section provides a comprehensive overview of the
          teacher's educational and professional information.
        </p>
      </header>

      <main className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="numOfYearsTeaching" className="text-right">
            Number of Years Teaching
          </Label>
          <InputField
            type="number"
            placeholder="Enter Number of Years Teaching"
            value={adminProfile?.numOfYearsTeaching}
            onChange={(e) =>
              handleInputChange("numOfYearsTeaching", e.target.value)
            }
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="designation" className="text-right">
            Designation
          </Label>
          <select
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="designation"
            value={adminProfile?.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
          >
            <option value="">Select Designation</option>
            <option value="TEACHER I">Teacher I</option>
            <option value="TEACHER II">Teacher II</option>
            <option value="TEACHER III">Teacher III</option>
            <option value="MASTER TEACHER I">Master Teacher I</option>
            <option value="MASTER TEACHER II">Master Teacher II</option>
            <option value="MASTER TEACHER III">Master Teacher III</option>
            <option value="PRINCIPAL I">Principal I</option>
            <option value="PRINCIPAL II">Principal II</option>
            <option value="PRINCIPAL III">Principal III</option>
            <option value="HEAD TEACHER">Head Teacher </option>
            <option value="DEPARTMENT HEAD">Department Head</option>
            <option value="SCHOOL ADMINISTRATOR">School Administrator</option>
            <option value="EDUCATION SUPERVISOR">Education Supervisor</option>
            <option value="SCHOOL SUPERINTENDENT">School Superintendent</option>
          </select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialization" className="text-right">
            Area of Specialization
          </Label>
          <select
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="specialization"
            value={adminProfile?.specialization}
            onChange={(e) =>
              handleInputChange("specialization", e.target.value)
            }
          >
            <option value="">Select Area of Specialization</option>
            <option value="FIRST specialization">1st specialization</option>
            <option value="SECOND specialization">2nd specialization</option>
          </select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="highestEducationalAttainment" className="text-right">
            Highest Educational Attainment
          </Label>
          <select
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="highestEducationalAttainment"
            value={adminProfile?.highestEducationalAttainment}
            onChange={(e) =>
              handleInputChange("highestEducationalAttainment", e.target.value)
            }
          >
            <option value="">Select Highest Educational Attainment</option>
            <option value="ACADEMIC">test</option>
            <option value="TVL">test</option>
          </select>
        </div>
      </main>
    </section>
  );
}
