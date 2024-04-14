import React from "react";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useClassNav } from "../contexts/ClassNavContext";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OverviewTable() {
  const { classDetails } = useClassDetails();

  if (!classDetails) {
    return <p>loading...</p>;
  }

  const { setTab } = useClassNav();

  const handleCopySectionName = () => {
    navigator.clipboard.writeText(classDetails.sectionName.toUpperCase());
  };

  return (
    <>
      <section className="flex flex-col gap-4 p-4 md:flex-row">
        <div className="order-2 flex gap-2">
          <Card
            className={`flex aspect-square w-full cursor-pointer flex-col hover:border-b-4 hover:border-r-4 md:w-[25ch] `}
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
            className={`flex aspect-square w-full cursor-pointer flex-col hover:border-b-4  hover:border-r-4 md:w-[25ch] `}
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
        </div>

        <div>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  {classDetails.sectionName.toUpperCase()}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={handleCopySectionName}
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Section Name</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  SY {classDetails.schoolYear} - {classDetails.semester}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Section Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Grade Level</span>
                    <span>{classDetails.gradeLevel}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Strand</span>
                    <span>{classDetails.strand.toUpperCase()}</span>
                  </li>
                </ul>
                <Separator className="my-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Adviser</div>
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>{classDetails.adviser}</span>
                  </address>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
