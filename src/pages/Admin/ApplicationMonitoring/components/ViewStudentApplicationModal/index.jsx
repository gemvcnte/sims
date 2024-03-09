import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  className,
}) => (
  <input
    className={`${className}`}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    name={name}
    disabled
  />
);

const selectOptions = [
  { value: "", label: "None" },
  { value: "JR", label: "Jr" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
  { value: "NONE", label: "None" },
];

export default function ViewStudentApplicationModal({
  application,
  onSave,
  onClose,
}) {
  const handleSaveChanges = () => {
    onSave();
    onClose();
  };

  return (
    <DialogContent
      className={"max-h-[80%] overflow-y-scroll px-10 lg:max-w-[720px]"}
    >
      <form onSubmit={handleSaveChanges}>
        {/* <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to student's profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader> */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              disabled
              id="lastName"
              type="text"
              defaultValue={application.lastName}
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
              disabled
              id="firstName"
              type="text"
              defaultValue={application.firstName}
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
              disabled
              id="middleName"
              type="text"
              defaultValue={application.middleName}
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
              disabled
              required
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={application.extensionName}
              name="extensionName"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              {selectOptions.map((option) => (
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
              value={application.birthDate}
              name="birthDate"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <select
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={application.gender}
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
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              value={application.currentAddress}
              name="currentAddress"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <InputField
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              value={application.emailAddress}
              name="emailAddress"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fatherName" className="text-right">
              Father's Name
            </Label>
            <InputField
              required
              type="text"
              value={application.fatherName}
              onChange={(e) => handleInputChange("fatherName", e.target.value)}
              name="fatherName"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motherName" className="text-right">
              Mother's Name
            </Label>
            <InputField
              required
              type="text"
              value={application.motherName}
              onChange={(e) => handleInputChange("motherName", e.target.value)}
              name="motherName"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="FatherContactNumber" className="text-right">
              Father's Tel. No.
            </Label>
            <InputField
              required
              type="number"
              value={application.fatherContactNumber}
              onChange={(e) =>
                handleInputChange("fatherContactNumber", e.target.value)
              }
              name="fatherContactNumber"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motherContactNumber" className="text-right">
              Mother's Tel. No.
            </Label>
            <InputField
              required
              type="number"
              value={application.motherContactNumber}
              onChange={(e) =>
                handleInputChange("motherContactNumber", e.target.value)
              }
              name="motherContactNumber"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="guardianName" className="text-right">
              Guardian's Name
            </Label>
            <InputField
              type="text"
              value={application.guardianName}
              onChange={(e) =>
                handleInputChange("guardianName", e.target.value)
              }
              name="guardianName"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="guardianContactNumber" className="text-right">
              Guardian's Tel. No.
            </Label>
            <InputField
              type="number"
              value={application.guardianContactNumber}
              onChange={(e) =>
                handleInputChange("guardianContactNumber", e.target.value)
              }
              name="guardianContactNumber"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="guardianRelationship" className="text-right">
              Guardian Relationship
            </Label>
            <select
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="guardianRelationship"
              value={application.guardianRelationship}
              onChange={(e) =>
                handleInputChange("guardianRelationship", e.target.value)
              }
            >
              <option value="">Relationship with Guardian</option>
              <option value="Relative">Relative</option>
              <option value="Non-relative">Non-relative</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lrn" className="text-right">
              LRN
            </Label>
            <input
              disabled
              type="number"
              value={application.lrn}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => handleInputChange("lrn", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="schoolYear" className="text-right">
              School Year
            </Label>
            <select
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="schoolYear"
              value={application.schoolYear[0].year}
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
            <Label htmlFor="semester" className="text-right">
              Semester
            </Label>
            <select
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="semester"
              value={application.schoolYear[0].semester}
              onChange={(e) => handleInputChange("semester", e.target.value)}
            >
              <option value="">Select Semester</option>
              <option value="first semester">1st Semester</option>
              <option value="second semester">2nd Semester</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gradeLevel" className="text-right">
              Grade Level
            </Label>
            <select
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="gradeLevel"
              value={application.schoolYear[0].gradeLevel}
              onChange={(e) => handleInputChange("gradeLevel", e.target.value)}
            >
              <option value="">Select Grade Level</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="track" className="text-right">
              Track
            </Label>
            <select
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="track"
              value={application.schoolYear[0].track}
              onChange={(e) => handleInputChange("track", e.target.value)}
            >
              <option value="">Select Track</option>
              <option value="ACADEMIC">Academic Track</option>
              <option value="academic">Academic Track</option>
              <option value="TVL">TVL Track</option>
              <option value="tvl">TVL Track</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="strand" className="text-right">
              Strand
            </Label>

            <select
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="strand"
              value={application.schoolYear[0].strand}
              onChange={(e) => handleInputChange("strand", e.target.value)}
            >
              <option value="">Select Strand</option>
              <option value="ABM">ABM</option>
              <option value="abm">ABM</option>
              <option value="HUMSS">HUMSS</option>
              <option value="humss">HUMSS</option>
              <option value="STEM">STEM</option>
              <option value="stem">STEM</option>
              <option value="ICT">ICT</option>
              <option value="ict">ICT</option>
              <option value="HE">HE</option>
              <option value="he">HE</option>
            </select>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="mb-2 border-none">
            <AccordionTrigger className="ml-auto max-w-[30ch]">
              View Past Academic Records
            </AccordionTrigger>
            <AccordionContent>
              {application.schoolYear.length > 1 ? (
                <section>
                  <div className="flex flex-col gap-12">
                    {application.schoolYear.slice(1).map((yearData, index) => (
                      <div key={index} className="flex flex-col gap-2">
                        <div className="text-right italic">
                          <span>
                            SY {yearData.year} -{" "}
                            {yearData.semester.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor={`gradeLevel-${index}`}
                            className="text-right"
                          >
                            Grade Level
                          </Label>
                          <InputField
                            disabled
                            type="text"
                            value={yearData.gradeLevel}
                            name={`gradeLevel-${index}`}
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>

                        {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor={`track-${index}`}
                          className="text-right"
                        >
                          Track
                        </Label>
                        <InputField
                          disabled
                          type="text"
                          value={yearData.track}
                          name={`track-${index}`}
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div> */}

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor={`strand-${index}`}
                            className="text-right"
                          >
                            Strand
                          </Label>
                          <InputField
                            disabled
                            type="text"
                            value={yearData.strand}
                            name={`strand-${index}`}
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor={`strand-${index}`}
                            className="text-right"
                          >
                            Section Name
                          </Label>
                          <InputField
                            disabled
                            type="text"
                            value={yearData.sectionName}
                            name={`strand-${index}`}
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                <div className="py-4 text-center text-muted-foreground">
                  No past academic records found.
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <DialogFooter>
          <Button type="submit" variant="outline" className="w-full">
            Close
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
