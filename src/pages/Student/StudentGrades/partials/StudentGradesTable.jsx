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
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentGradesTable({ setSectionName }) {
  const { user } = useAuth();
  const classDetailsContext = useClassDetails();
  const { classDetails: fetchedClass, loading } = classDetailsContext;
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    if (fetchedClass && fetchedClass.length > 0) {
      const sortedClasses = [...fetchedClass].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setClassDetails(sortedClasses[0]);
      setSectionName(sortedClasses[0].sectionName);
    }
  }, [fetchedClass]);

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

      return (
        <TableRow key={subject._id}>
          <TableCell>{subject.subjectName}</TableCell>
          <TableCell>{subject.subjectTeacher}</TableCell>
          <TableCell>{p1Grade}</TableCell>
          <TableCell>{p2Grade}</TableCell>
          <TableCell>{roundedFinalGrade}</TableCell>
          <TableCell>{remarks}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <main className="m-4">
      <Table>
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
