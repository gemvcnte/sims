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
import fetchStudentsApi from "../helpers/fetchStudentsApi";
import updateStudentsInClassApi from "../helpers/updateStudentsInClassApi";
import { Button } from "@/components/ui/button";

export default function StudentsTable({ classDetails }) {
  const [allStudents, setAllStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isEditing) {
        await fetchStudentsApi(setAllStudents);
        setSelectedStudents(
          classDetails.students.map((student) => student.emailAddress),
        );
      } else {
        setAllStudents(classDetails.students);
        setSelectedStudents(
          classDetails.students.map((student) => student._id),
        );
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

    console.log(updatedSelectedStudents);
    setSelectedStudents(updatedSelectedStudents);
  };

  const handleSaveChanges = async () => {
    try {
      await updateStudentsInClassApi(classDetails._id, selectedStudents);

      setSelectedStudents([]);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating students in class:", error);
    }
  };

  return (
    <main className="p-4">
      <div className="mb-4 flex gap-4">
        <Button variant="outline" onClick={() => setIsEditing((prev) => !prev)}>
          {isEditing ? "Cancel Editing" : "Edit Students"}
        </Button>
        {isEditing && <Button onClick={handleSaveChanges}>Save Changes</Button>}
      </div>

      <Table>
        {classDetails.students.length === 0 && !isEditing ? (
          <TableCaption className="pb-4">No Students Found</TableCaption>
        ) : null}

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
                    checked={selectedStudents.includes(student.emailAddress)}
                    onChange={() => handleAddStudent(student.emailAddress)}
                  />
                </TableCell>
              )}
              <TableCell className="uppercase">{student.lastName}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell className="inline-block">
                View <span className="hidden sm:inline">Student</span> Profile
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
