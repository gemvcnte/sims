import React from "react";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useClassNav } from "../contexts/ClassNavContext";

export default function OverviewTable() {
  const { classDetails } = useClassDetails();

  if (!classDetails) {
    return <p>loading...</p>;
  }

  const { setTab } = useClassNav();

  return (
    <>
      <div className="gap-4 md:flex">
        <header className="flex max-w-[52ch] justify-between gap-4 p-4 md:order-2 ">
          <Card
            className={`flex aspect-square w-[25ch] cursor-pointer flex-col hover:border-b-4 hover:border-r-4 `}
            onClick={() => setTab("students")}
          >
            <CardTitle className="flex justify-end p-2"></CardTitle>
            <CardContent
              className={`flex h-full flex-col items-center justify-center gap-2 text-center `}
            >
              <h1 className="text-2xl font-bold">
                {classDetails.students.length}
              </h1>
              <span>Total Students</span>
            </CardContent>
          </Card>
          <Card
            className={`flex aspect-square w-[25ch] cursor-pointer flex-col  hover:border-b-4 hover:border-r-4 `}
            onClick={() => setTab("subjects")}
          >
            <CardTitle className="flex justify-end p-2"></CardTitle>
            <CardContent
              className={`flex h-full flex-col items-center justify-center gap-2 text-center `}
            >
              <h1 className="text-2xl font-bold">
                {classDetails.subjects.length}
              </h1>
              <span>Total Subjects</span>
            </CardContent>
          </Card>
        </header>
        <main className="flex flex-col gap-4 p-4 md:w-[32%]">
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
              <Input value={classDetails.strand.toUpperCase()} disabled />
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
      </div>
    </>
  );
}
