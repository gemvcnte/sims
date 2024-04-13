import React, { useEffect, useState } from "react";
import { useClassDetails } from "../hooks/ClassDetailsContext";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHead,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentGradesTable({ setSectionName }) {
  const { user } = useAuth();
  const classDetailsContext = useClassDetails();
  const { classDetails: fetchedClass, loading } = classDetailsContext;

  if (loading) {
    return (
      <main className="m-4 flex flex-col gap-2">
        <Skeleton className="h-[10svh]"></Skeleton>
        <Skeleton className="h-[5svh]"></Skeleton>
        <Skeleton className="h-[5svh]"></Skeleton>
        <Skeleton className="h-[5svh]"></Skeleton>
        <Skeleton className="h-[5svh]"></Skeleton>
        <Skeleton className="h-[5svh]"></Skeleton>
        <Skeleton className="h-[5svh]"></Skeleton>
        <Skeleton className="h-[5svh]"></Skeleton>
        <Skeleton className="h-[5svh]"></Skeleton>
        <Skeleton className="h-[5svh]"></Skeleton>
        <Skeleton className="h-[5svh]"></Skeleton>
      </main>
    );
  }

  const classDetails = fetchedClass[0];

  const getStudentGrades = (subject) => {
    const student = classDetails?.students.find(
      (student) => student.lrn === user.lrn,
    );

    if (!student) {
      return { p1Grade: "", p2Grade: "" };
    }

    const gradesArray = subject.grades;

    if (Array.isArray(gradesArray) && gradesArray.length > 0) {
      const grades = gradesArray.find((grade) => grade.lrn === user.lrn);

      if (grades && "p1Grade" in grades && "p2Grade" in grades) {
        return grades;
      }
    }

    return { p1Grade: "", p2Grade: "" };
  };

  console.log(`fetchedClass`, fetchedClass);
  console.log(`classDetails`, classDetails);

  const renderSubjects = () => {
    return classDetails?.subjects.map((subject) => {
      const p1Grade = getStudentGrades(subject).p1Grade;
      const p2Grade = getStudentGrades(subject).p2Grade;

      const numericP1Grade = p1Grade ? parseInt(p1Grade, 10) : 0;
      const numericP2Grade = p2Grade ? parseInt(p2Grade, 10) : 0;

      const finalGrade = (numericP1Grade + numericP2Grade) / 2;
      const roundedFinalGrade =
        p1Grade !== "" && p2Grade !== "" ? Math.round(finalGrade) : null;
      const remarks =
        roundedFinalGrade !== null
          ? roundedFinalGrade >= 75
            ? "Passed"
            : "Failed"
          : null;

      const p1GradeClassName =
        roundedFinalGrade !== null && p1Grade < 75 ? "text-red-500" : "";

      const p2GradeClassName =
        roundedFinalGrade !== null && p2Grade < 75 ? "text-red-500" : "";

      const roundedFinalGradeClassName =
        roundedFinalGrade !== null && roundedFinalGrade < 75
          ? "text-red-500"
          : "";

      const remarksClassName =
        roundedFinalGrade !== null && remarks === "Failed"
          ? "text-red-500"
          : "";

      return (
        <TableRow key={subject._id}>
          <TableCell>{subject.subjectName}</TableCell>
          <TableCell>{subject.subjectTeacher}</TableCell>
          <TableCell className={p1GradeClassName}>{p1Grade}</TableCell>
          <TableCell className={p2GradeClassName}>{p2Grade}</TableCell>
          <TableCell className={roundedFinalGradeClassName}>
            {roundedFinalGrade}
          </TableCell>
          <TableCell className={remarksClassName}>{remarks}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <main className="m-4">
      <Table>
        {!classDetails && (
          <TableCaption className="pb-6 pt-4">No Grades Found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Subject Name</TableHead>
            <TableHead>Subject Teacher</TableHead>
            <TableHead>P1 Grade</TableHead>
            <TableHead>P2 Grade</TableHead>
            <TableHead>Final Grade</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderSubjects()}</TableBody>
        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}
