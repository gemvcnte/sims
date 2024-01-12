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

  console.log(classDetails);

  const getStudentGrades = (subject) => {
    const student = classDetails?.students.find(
      (student) => student.lrn === user.lrn,
    );

    if (!student) {
      return { p1Grade: "", p2Grade: "" };
    }

    const gradesArray = subject.grades;

    // Check if gradesArray is an array with at least one element
    if (Array.isArray(gradesArray) && gradesArray.length > 0) {
      const grades = gradesArray.find((grade) => grade.lrn === user.lrn);

      // Check if grades is an object with p1Grade and p2Grade properties
      if (grades && "p1Grade" in grades && "p2Grade" in grades) {
        return grades;
      }
    }

    return { p1Grade: "", p2Grade: "" };
  };

  const renderSubjects = () => {
    return classDetails?.subjects.map((subject) => (
      <TableRow key={subject._id}>
        <TableCell>{subject.subjectName}</TableCell>
        <TableCell>{subject.subjectTeacher}</TableCell>
        <TableCell>{getStudentGrades(subject).p1Grade}</TableCell>
        <TableCell>{getStudentGrades(subject).p2Grade}</TableCell>
      </TableRow>
    ));
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
          </TableRow>
        </TableHeader>

        <TableBody>{renderSubjects()}</TableBody>

        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}
