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
import { useAuth } from "@/contexts/AuthContext";

export default function GradesTable() {
  const { user } = useAuth();
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  const [allStudents, setAllStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(""); // State for selected subject

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

  // Filter subjects based on the subjectTeacher
  const filteredSubjects = classDetails?.subjects.filter(
    (subject) => subject.subjectTeacher === user.username,
  );

  useEffect(() => {
    // Set the first subject as the default selected subject
    if (filteredSubjects.length > 0) {
      setSelectedSubject(filteredSubjects[0].subjectName);
    }
  }, []);

  return (
    <main className="p-4">
      <div className="mb-4 flex justify-between gap-4">
        <Button variant="outline" onClick={() => setIsEditing((prev) => !prev)}>
          {isEditing ? "Cancel Editing" : "Edit Grades"}
        </Button>
        {isEditing && <Button onClick={handleSaveChanges}>Save Changes</Button>}
        <div>
          <select
            onChange={(e) => setSelectedSubject(e.target.value)}
            value={selectedSubject}
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select Subject</option>
            {filteredSubjects.map((subject) => (
              <option key={subject._id} value={subject.subjectName}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table>
        {classDetails?.students.length === 0 && !isEditing && (
          <TableCaption className="pb-4">No Students Found</TableCaption>
        )}

        <TableHeader>
          <TableRow>
            {isEditing && <TableHead></TableHead>}
            <TableHead>Lastname</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>LRN</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>P1</TableHead>
            <TableHead>P2</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredSubjects
            .filter((subject) => subject.subjectName === selectedSubject)
            .map((subject) =>
              subject.grades.map((grade) => {
                const matchedStudent = classDetails.students.find(
                  (student) => student.lrn === grade.lrn,
                );
                console.log(matchedStudent);
                return (
                  <TableRow
                    key={grade.lrn}
                    className="group transition-all duration-700 hover:cursor-pointer"
                  >
                    {isEditing && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(grade.lrn)}
                          onChange={() => handleAddStudent(grade.lrn)}
                        />
                      </TableCell>
                    )}
                    <TableCell>{matchedStudent?.lastName}</TableCell>
                    <TableCell>{matchedStudent?.firstName}</TableCell>
                    <TableCell>{grade.lrn}</TableCell>
                    <TableCell>{subject.subjectName}</TableCell>
                    <TableCell>{grade.p1Grade}</TableCell>
                    <TableCell>{grade.p2Grade}</TableCell>
                    <TableCell className="inline-block">
                      <span className="border-b border-background py-1 hover:border-foreground">
                        View <span className="hidden sm:inline">Student</span>{" "}
                        Profile
                      </span>
                      <Icon
                        icon="octicon:arrow-down-24"
                        rotate={3}
                        className="ml-2 inline-block -rotate-45 transform transition-all group-hover:rotate-45"
                      />
                    </TableCell>
                  </TableRow>
                );
              }),
            )}
        </TableBody>

        <TableFooter></TableFooter>
      </Table>
    </main>
  );
}
