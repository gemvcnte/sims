import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import axios from "axios";

export default function StudentsTable({ classDetails }) {
  const [allStudents, setAllStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/teacher/getStudents",
        );
        setAllStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching all students:", error);
      }
    };

    if (isEditing) {
      fetchAllStudents();
      setSelectedStudents(
        classDetails.students.map((student) => student.emailAddress),
      );
    } else {
      setAllStudents(classDetails.students);
      setSelectedStudents(classDetails.students.map((student) => student._id));
    }
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
      await axios.post(
        "http://localhost:5000/teacher/update-students-in-class",
        {
          classId: classDetails._id,
          studentEmails: selectedStudents,
        },
      );

      setSelectedStudents([]);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating students in class:", error);
    }
  };

  return (
    <main className="p-4">
      <button onClick={() => setIsEditing((prev) => !prev)}>
        {isEditing ? "Cancel Editing" : "Edit Students"}
      </button>
      {isEditing && <button onClick={handleSaveChanges}>Save Changes</button>}

      <Table>
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
