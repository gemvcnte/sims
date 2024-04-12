import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { InputField } from "@/pages/Admin/AdminProfile/components/AdminProfileDisplayAndEditSection/common";
export function PastAcademicRecordsAccordion({ studentData }) {
  console.log(`studentData`, studentData);

  if (!studentData) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="mb-2 border-none">
        <AccordionTrigger className="ml-auto max-w-[30ch]">
          View Past Academic Records
        </AccordionTrigger>
        <AccordionContent>
          {studentData.schoolYear.length >= 1 ? (
            <section>
              <div className="flex flex-col gap-12">
                {studentData.schoolYear.map((yearData, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="text-right italic">
                      <span>
                        SY {yearData.year} - {yearData.semester.toUpperCase()}
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
                      <Label htmlFor={`strand-${index}`} className="text-right">
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
                      <Label htmlFor={`strand-${index}`} className="text-right">
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
  );
}
