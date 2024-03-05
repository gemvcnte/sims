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
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import fetchStudentsApi from "../helpers/fetchStudentsApi";
import updateStudentsInClassApi from "../helpers/updateStudentsInClassApi";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import { isClassAdviser } from "../helpers/isClassAdviser";
import showSuccessNotification from "@/utils/ShowSuccessNotification";

export default function StudentsTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  const [allStudents, setAllStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (classDetails && isEditing) {
          await fetchStudentsApi(setAllStudents);
          setSelectedStudents(
            classDetails.students.map((student) => student.lrn),
          );
        } else if (classDetails) {
          setAllStudents(classDetails.students);
          setSelectedStudents(
            classDetails.students.map((student) => student._id),
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isEditing, classDetails]);

  const handleAddStudent = (studentEmail) => {
    const updatedSelectedStudents = [...selectedStudents];

    if (updatedSelectedStudents.includes(studentEmail)) {
      updatedSelectedStudents.splice(
        updatedSelectedStudents.indexOf(studentEmail),
        1,
      );
    } else {
      updatedSelectedStudents.push(studentEmail);
    }

    setSelectedStudents(updatedSelectedStudents);
  };

  const handleSaveChanges = async () => {
    try {
      if (classDetails) {
        await updateStudentsInClassApi(classDetails._id, selectedStudents);

        showSuccessNotification("Updated Successfully");
        fetchClassDetails();
        setSelectedStudents([]);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating students in class:", error);
    }
  };

  const isAdviser = isClassAdviser(classDetails);

  return (
    <main className="p-4">
      <Table>
        {classDetails?.students.length === 0 && !isEditing && (
          <TableCaption className="pb-4">No Students Found</TableCaption>
        )}

        <TableHeader>
          <TableRow>
            {isEditing && <TableHead></TableHead>}
            <TableHead>Lastname</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allStudents.map((student) => (
            <TableRow
              key={student._id}
              className="group transition-all duration-700 hover:cursor-pointer"
            >
              {isEditing && (
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.lrn)}
                    onChange={() => handleAddStudent(student.lrn)}
                  />
                </TableCell>
              )}
              <TableCell className="uppercase">{student.lastName}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell className="inline-block">
                <span className="border-b border-background py-1 hover:border-foreground">
                  View <span className="hidden sm:inline">Student</span> Profile
                </span>
                <Icon
                  icon="octicon:arrow-down-24"
                  rotate={3}
                  className="ml-2 inline-block -rotate-45 transform transition-all group-hover:rotate-45"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}
