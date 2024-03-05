import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/utils/axios";
import { updateGradesEndpoint } from "@/config/teacherEndpoints";

export default function GradesTable() {
  const { user } = useAuth();
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [modifiedGrades, setModifiedGrades] = useState({});

  const handleSaveChanges = async () => {
    try {
      const classId = classDetails._id;
      const subjectId = classDetails.subjects.find(
        (subject) => subject.subjectName === selectedSubject,
      )?._id;

      const gradesData = {
        classId,
        subjectId,
        grades: modifiedGrades,
      };

      const response = await axiosInstance.patch(
        updateGradesEndpoint,
        gradesData,
      );

      if (response.status === 200) {
        showSuccessNotification("Updated Successfully");
        fetchClassDetails();
        setIsEditing(false);
      } else {
        console.error("Failed to update grades:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating grades:", error.message);
    }
  };

  const filteredSubjects = classDetails?.subjects.filter(
    (subject) => subject.subjectTeacher === user.username,
  );

  useEffect(() => {
    if (filteredSubjects.length > 0) {
      setSelectedSubject(filteredSubjects[0].subjectName);
    }
  }, []);

  const handleChangeGrade = (lrn, type, value) => {
    setModifiedGrades((prevGrades) => ({
      ...prevGrades,
      [lrn]: {
        ...prevGrades[lrn],
        [type]: value,
      },
    }));
  };

  useEffect(() => {
    initializeModifiedGrades();
  }, [selectedSubject]);

  const initializeModifiedGrades = () => {
    const initialModifiedGrades = {};

    if (classDetails) {
      const selectedSubjectDetails = classDetails.subjects.find(
        (subject) => subject.subjectName === selectedSubject,
      );

      if (selectedSubjectDetails) {
        selectedSubjectDetails.grades.forEach((grade) => {
          initialModifiedGrades[grade.lrn] = {
            p1Grade: grade.p1Grade || "",
            p2Grade: grade.p2Grade || "",
          };
        });
      }
    }

    setModifiedGrades(initialModifiedGrades);
  };

  const renderSortedStudents = () => {
    const studentsToRender = classDetails?.students || [];

    return studentsToRender
      .slice()
      .sort((a, b) => a.lastName.localeCompare(b.lastName))
      .map((student) => {
        const selectedSubjectDetails = classDetails.subjects.find(
          (subject) => subject.subjectName === selectedSubject,
        );

        if (selectedSubjectDetails) {
          const grade = selectedSubjectDetails.grades.find(
            (grade) => grade.lrn === student.lrn,
          );

          return (
            <TableRow
              key={student._id}
              className="group transition-all duration-700 hover:cursor-pointer"
            >
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lrn}</TableCell>
              <TableCell>{selectedSubject}</TableCell>
              {isEditing ? (
                <TableCell>
                  <input
                    type="number"
                    className="border bg-background text-foreground"
                    value={modifiedGrades[student.lrn]?.p1Grade}
                    onChange={(e) =>
                      handleChangeGrade(student.lrn, "p1Grade", e.target.value)
                    }
                  />
                </TableCell>
              ) : (
                <TableCell>{grade?.p1Grade || ""}</TableCell>
              )}
              {isEditing ? (
                <TableCell>
                  <input
                    type="number"
                    className="border bg-background text-foreground"
                    value={modifiedGrades[student.lrn]?.p2Grade}
                    onChange={(e) =>
                      handleChangeGrade(student.lrn, "p2Grade", e.target.value)
                    }
                  />
                </TableCell>
              ) : (
                <TableCell>{grade?.p2Grade || ""}</TableCell>
              )}
            </TableRow>
          );
        }

        return null; // Return null if selectedSubjectDetails is not defined
      });
  };

  return (
    <main className="p-4">
      <Table>
        {classDetails?.students.length === 0 && !isEditing && (
          <TableCaption className="pb-4">No Students Found</TableCaption>
        )}

        <TableHeader>
          <TableRow>
            <TableHead>Lastname</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>LRN</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>P1</TableHead>
            <TableHead>P2</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>{renderSortedStudents()}</TableBody>

        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}
