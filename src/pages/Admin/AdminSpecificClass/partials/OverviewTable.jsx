import React from "react";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function OverviewTable() {
  const { classDetails } = useClassDetails();

  if (!classDetails) {
    return <p>loading...</p>;
  }

  return (
    <main className="flex flex-col gap-4 p-4 ">
      <section className="flex flex-col gap-4 ">
        <div>
          <Label>Section Name</Label>
          <Input value={classDetails.sectionName.toUpperCase()} disabled />
        </div>

        <div>
          <Label>Adviser</Label>
          <Input value={classDetails.adviser} disabled />
        </div>
        <div>
          <Label>Grade Level</Label>
          <Input value={classDetails.gradeLevel} disabled />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <Label>Strand</Label>
          <Input value={classDetails.strand} disabled />
        </div>
        <div>
          <Label>School Year</Label>
          <Input value={classDetails.schoolYear} disabled />
        </div>
        <div>
          <Label>Semester</Label>
          <Input value={classDetails.semester} disabled />
        </div>
      </section>
    </main>
  );
}
