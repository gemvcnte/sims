import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { InputField } from "@/pages/Admin/AdminProfile/components/AdminProfileDisplayAndEditSection/common";
import { Input } from "@/components/ui/input";

const selectOptions = [
  { value: "", label: "None" },
  { value: "JR", label: "Jr" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
  { value: "NONE", label: "None" },
];

export function PastStudentProfileAccordion({ studentData: application }) {
  if (!application) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="mb-2 border-none">
        <AccordionTrigger className="ml-auto max-w-[30ch]">
          View Past Student Profile
        </AccordionTrigger>
        <AccordionContent>
          <form>
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
                  className="col-span-3"
                />
              </div>

              {application?.hasAccount ? null : (
                <>
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
                      disabled
                      type="date"
                      value={application.birthDate}
                      name="birthDate"
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
                      disabled
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      value={application.currentAddress}
                      name="currentAddress"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <InputField
                      disabled
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      value={application.emailAddress}
                      name="emailAddress"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fatherName" className="text-right">
                      Father's Name
                    </Label>
                    <InputField
                      disabled
                      required
                      type="text"
                      value={application.fatherName}
                      name="fatherName"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                      value={application.motherName}
                      name="motherName"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                      value={application.fatherContactNumber}
                      name="fatherContactNumber"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                      value={application.motherContactNumber}
                      name="motherContactNumber"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="guardianName" className="text-right">
                      Guardian's Name
                    </Label>
                    <InputField
                      disabled
                      type="text"
                      value={application.guardianName}
                      name="guardianName"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="guardianContactNumber"
                      className="text-right"
                    >
                      Guardian's Tel. No.
                    </Label>
                    <InputField
                      disabled
                      type="number"
                      value={application.guardianContactNumber}
                      name="guardianContactNumber"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="guardianRelationship"
                      className="text-right"
                    >
                      Guardian Relationship
                    </Label>
                    <select
                      disabled
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      name="guardianRelationship"
                      value={application.guardianRelationship}
                    >
                      <option value="">Relationship with Guardian</option>
                      <option value="Relative">Relative</option>
                      <option value="Non-relative">Non-relative</option>
                    </select>
                  </div>
                </>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lrn" className="text-right">
                  LRN
                </Label>
                <input
                  disabled
                  type="number"
                  value={application.lrn}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schoolYear" className="text-right">
                  School Year
                </Label>
                <select
                  disabled
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="schoolYear"
                  value={application.schoolYear[0].year}
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
              </div> */}
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
