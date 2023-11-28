import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import extensionNameSelectOptions from "../extensionNameSelectOptions";
import InputField from "../InputField";

export function PersonalInformationSection({
  studentProfile,
  handleInputChange,
}) {
  return (
    <section className="academic-information-section p-4 sm:flex">
      <header className="mb-2 text-center md:max-w-[30%] md:text-start ">
        <h1 className="font-normal">Personal Information</h1>
        <p className="hidden text-sm font-thin text-muted-foreground sm:block">
          The academic section provides a comprehensive overview of the
          student's academic information.
        </p>
      </header>

      <main className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastName" className="text-right">
            Last Name
          </Label>
          <Input
            disabled
            id="lastName"
            type="text"
            placeholder="Input Your Last Name"
            defaultValue={studentProfile?.lastName}
            name="lastName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstName" className="text-right">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Input Your First Name"
            defaultValue={studentProfile?.firstName}
            name="firstName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="middleName" className="text-right">
            Middle Name
          </Label>
          <Input
            id="middleName"
            type="text"
            placeholder="Input Your Middle Name"
            defaultValue={studentProfile?.middleName}
            name="middleName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="extensionName" className="text-right">
            Extension Name
          </Label>
          <select
            required
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={studentProfile?.extensionName}
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
          <Label htmlFor="birthDate" className="text-right">
            BirthDate
          </Label>
          <InputField
            type="date"
            placeholder="Input Your Birthdate (MM/DD/YY)"
            value={studentProfile?.birthDate}
            name="birthDate"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="gender" className="text-right">
            Gender
          </Label>
          <select
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={studentProfile?.gender}
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
          <Label htmlFor="currentAddress" className="text-right">
            Current Address
          </Label>
          <InputField
            type="text"
            placeholder="E.g., 123 Purok St, Barangay, Municipality"
            value={studentProfile?.currentAddress}
            name="currentAddress"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <InputField
            type="email"
            placeholder="Input Your Email"
            value={studentProfile?.emailAddress}
            name="emailAddress"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>
      </main>
    </section>
  );
}
