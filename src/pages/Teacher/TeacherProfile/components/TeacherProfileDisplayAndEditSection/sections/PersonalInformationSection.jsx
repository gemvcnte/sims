import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { extensionNameSelectOptions, InputField } from "../common";

export function PersonalInformationSection({
  teacherProfile,
  handleInputChange,
}) {
  return (
    <section className="academic-information-section gap-4 p-4 sm:flex">
      <header className="mb-2 text-center sm:max-w-[25%] sm:text-start md:max-w-[30%]">
        <h1 className="font-normal">Personal Information</h1>
        <p className="hidden text-sm font-thin text-muted-foreground sm:block">
          The personal section provides a comprehensive overview of the
          teacher's personal information.
        </p>
      </header>

      <main className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastName" className="text-right text-xs sm:text-sm">
            Last Name
          </Label>
          <Input
            required
            id="lastName"
            type="text"
            placeholder="Input Your Last Name"
            defaultValue={teacherProfile?.lastName}
            name="lastName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="col-span-3 uppercase"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstName" className="text-right text-xs sm:text-sm">
            First Name
          </Label>
          <Input
            required
            id="firstName"
            type="text"
            placeholder="Input Your First Name"
            defaultValue={teacherProfile?.firstName}
            name="firstName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="col-span-3 uppercase"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="middleName" className="text-right text-xs sm:text-sm">
            Middle Name
          </Label>
          <Input
            id="middleName"
            type="text"
            placeholder="Input Your Middle Name"
            defaultValue={teacherProfile?.middleName}
            name="middleName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="col-span-3 uppercase"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="extensionName"
            className="text-right text-xs sm:text-sm"
          >
            Extension Name
          </Label>
          <select
            required
            className=":cursor-not-allowed :opacity-50 col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={teacherProfile?.extensionName}
            name="extensionName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          >
            {extensionNameSelectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="birthDate" className="text-right text-xs sm:text-sm">
            BirthDate
          </Label>
          <InputField
            required
            type="date"
            placeholder="Input Your Birthdate (MM/DD/YY)"
            value={teacherProfile?.birthDate}
            name="birthDate"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="gender" className="text-right text-xs sm:text-sm">
            Gender
          </Label>
          <select
            className=":cursor-not-allowed :opacity-50 col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={teacherProfile?.gender}
            required
            name="gender"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="currentAddress"
            className="text-right text-xs sm:text-sm"
          >
            Current Address
          </Label>
          <InputField
            type="text"
            placeholder="E.g., 123 Purok St, Barangay, Municipality"
            value={teacherProfile?.currentAddress}
            name="currentAddress"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right text-xs sm:text-sm">
            Email
          </Label>
          <InputField
            required={true}
            type="email"
            placeholder="Input Your Email"
            value={teacherProfile?.emailAddress}
            name="emailAddress"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>
      </main>
    </section>
  );
}