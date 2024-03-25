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
import { isClassAdviser } from "../helpers/isClassAdviser";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CSVLink } from "react-csv";
import { Download, Mail } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SpecificStudentGradesModal from "./SpecificStudentGradesModal";

const schema = yup.object().shape({
  p1Grade: yup
    .number()
    .transform((currentValue, originalValue) => {
      return originalValue === "" ? null : currentValue;
    })
    .nullable()
    .typeError("Grade must be a number")
    .min(65, "Grade must be at least 65")
    .max(100, "Grade must be at most 100"),
  p2Grade: yup
    .number()
    .transform((currentValue, originalValue) => {
      return originalValue === "" ? null : currentValue;
    })
    .nullable()
    .typeError("Grade must be a number")
    .min(65, "Grade must be at least 65")
    .max(100, "Grade must be at most 100"),
});

export default function GradesTable() {
  const { user } = useAuth();
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [modifiedGrades, setModifiedGrades] = useState({});
  const [csvData, setCsvData] = useState([]); // State to store CSV data

  useEffect(() => {
    if (classDetails && selectedSubject) {
      const selectedSubjectDetails = classDetails.subjects.find(
        (subject) => subject.subjectName === selectedSubject,
      );

      if (selectedSubjectDetails) {
        const data = selectedSubjectDetails.grades.map((grade) => ({
          Lastname:
            classDetails.students.find((student) => student.lrn === grade.lrn)
              ?.lastName || "",
          Firstname:
            classDetails.students.find((student) => student.lrn === grade.lrn)
              ?.firstName || "",
          LRN: grade.lrn,
          Subject: selectedSubject,
          P1Grade: grade.p1Grade || "",
          P2Grade: grade.p2Grade || "",
        }));
        setCsvData(data);
      }
    }
  }, [classDetails, selectedSubject]);

  console.log(classDetails);

  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // console.log(`modifiedGrades: ${modifiedGrades}`);

    try {
      const isValid = await form.trigger();
      if (!isValid) return;

      console.log("validation passed");
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

  let filteredSubjects = classDetails?.subjects.filter(
    (subject) => subject.subjectTeacher === user.username,
  );

  const isAdviser = isClassAdviser(classDetails);
  if (isAdviser) {
    filteredSubjects = classDetails?.subjects;
  }

  const isSubjectTeacher =
    selectedSubject &&
    classDetails.subjects.find(
      (subject) => subject.subjectName === selectedSubject,
    )?.subjectTeacher === user.username;

  useEffect(() => {
    if (filteredSubjects.length > 0) {
      setSelectedSubject(filteredSubjects[0].subjectName);
    }
  }, []);

  const handleChangeGrade = (lrn, type, value) => {
    // Convert empty string to null
    const numericValue = value === "" ? null : parseFloat(value);
    console.log(numericValue);

    setModifiedGrades((prevGrades) => ({
      ...prevGrades,
      [lrn]: {
        ...prevGrades[lrn],
        [type]: numericValue,
      },
    }));
  };

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

  useEffect(() => {
    if (filteredSubjects.length > 0) {
      setSelectedSubject(filteredSubjects[0].subjectName);
    }
  }, [filteredSubjects]);

  useEffect(() => {
    initializeModifiedGrades();
  }, [selectedSubject]);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: modifiedGrades, // Set default values here
  });

  const headers = [
    { label: "Lastname", key: "Lastname" },
    { label: "Firstname", key: "Firstname" },
    { label: "LRN", key: "LRN" },
    { label: "Subject", key: "Subject" },
    { label: "QTR1 Grade", key: "P1Grade" },
    { label: "QTR2 Grade", key: "P2Grade" },
  ];

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
                  {/* <input
                    type="number"
                    className="border bg-background text-foreground"
                    value={modifiedGrades[student.lrn]?.p1Grade}
                    onChange={(e) =>
                      handleChangeGrade(student.lrn, "p1Grade", e.target.value)
                    }
                  /> */}
                  <FormField
                    control={form.control}
                    name="p1Grade"
                    render={({ field }) => (
                      <FormItem className="space-y-0 py-4">
                        <FormControl>
                          <Input
                            type="number"
                            className={`${
                              modifiedGrades[student.lrn]?.p1Grade < 75
                                ? "text-[#ff0000]"
                                : ""
                            } min-w-[10ch] border bg-background`}
                            {...field}
                            id="p1Grade"
                            value={modifiedGrades[student.lrn]?.p1Grade}
                            onChange={(e) => {
                              field.onChange(e); // This should be sufficient for controlled inputs
                              handleChangeGrade(
                                student.lrn,
                                "p1Grade",
                                e.target.value,
                              );
                            }}
                          />
                        </FormControl>
                        {(modifiedGrades[student.lrn]?.p1Grade < 65 ||
                          modifiedGrades[student.lrn]?.p1Grade > 100) &&
                          modifiedGrades[student.lrn]?.p1Grade !== null &&
                          modifiedGrades[student.lrn]?.p1Grade !== "" && (
                            <FormMessage />
                          )}
                      </FormItem>
                    )}
                  />
                </TableCell>
              ) : (
                <TableCell
                  className={`${grade?.p1Grade < 75 ? "text-[#ff0000]" : ""} `}
                >
                  {grade?.p1Grade || ""}
                </TableCell>
              )}
              {isEditing ? (
                <TableCell>
                  <FormField
                    control={form.control}
                    name="p2Grade"
                    render={({ field }) => (
                      <FormItem className="space-y-0 py-4">
                        <FormControl>
                          <Input
                            type="number"
                            className={`${
                              modifiedGrades[student.lrn]?.p2Grade < 75
                                ? "text-[#ff0000]"
                                : ""
                            } min-w-[10ch] border bg-background`}
                            {...field}
                            id="p2Grade"
                            value={modifiedGrades[student.lrn]?.p2Grade}
                            onChange={(e) => {
                              field.onChange(e); // This should be sufficient for controlled inputs
                              handleChangeGrade(
                                student.lrn,
                                "p2Grade",
                                e.target.value,
                              );
                            }}
                          />
                        </FormControl>
                        {(modifiedGrades[student.lrn]?.p2Grade < 65 ||
                          modifiedGrades[student.lrn]?.p2Grade > 100) &&
                          modifiedGrades[student.lrn]?.p2Grade !== null &&
                          modifiedGrades[student.lrn]?.p2Grade !== "" && (
                            <FormMessage />
                          )}
                      </FormItem>
                    )}
                  />
                </TableCell>
              ) : (
                <TableCell
                  className={`${grade?.p2Grade < 75 ? "text-[#ff0000]" : ""} `}
                >
                  {grade?.p2Grade || ""}
                </TableCell>
              )}
              <TableCell>
                <Button
                  variant="text"
                  onClick={(e) => handleViewAllGrades(e, student)}
                >
                  View All Grades
                </Button>
              </TableCell>
            </TableRow>
          );
        }

        return null; // Return null if selectedSubjectDetails is not defined
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  const handleViewAllGrades = (e, student) => {
    e.preventDefault();

    if (!student) return;

    // Create an object to store LRN, lastname, firstname, and grades
    const studentDetails = {
      SchoolYear: classDetails.schoolYear,
      Semester: classDetails.semester,
      SectionName: classDetails.sectionName,
      GradeLevel: classDetails.gradeLevel,
      Strand: classDetails.strand,
      LRN: student.lrn,
      Lastname: student.lastName,
      Firstname: student.firstName,
      studentGrades: [],
    };

    // Loop through all subjects to find grades for the selected student
    classDetails.subjects.forEach((subject) => {
      subject.grades.forEach((grade) => {
        if (grade.lrn === student.lrn) {
          studentDetails.studentGrades.push({
            Subject: subject.subjectName,
            P1Grade: grade.p1Grade || "",
            P2Grade: grade.p2Grade || "",
          });
        }
      });
    });

    console.log("Student Grades:", studentDetails);

    setStudentDetails(studentDetails);
    setIsModalOpen(true);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Form {...form}>
        <form>
          <main className="p-4">
            <header className="mb-4 flex justify-between gap-4">
              {/* {isSubjectTeacher ? (
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Cancel Editing" : "Edit Grades"}
            </Button>
            {isEditing && (
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            )}
          </div>
        ) : (
          <div></div>
        )} */}

              <div className="flex gap-4">
                <Button
                  disabled={!isSubjectTeacher}
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing((prev) => !prev)}
                >
                  {isEditing ? "Cancel Editing" : "Edit Grades"}
                </Button>
                {isEditing && (
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                )}
              </div>
              <div className="flex gap-2">
                {selectedSubject && (
                  <CSVLink data={csvData} headers={headers}>
                    <Button
                      className="border-none bg-green-400"
                      variant="outline"
                      type="button"
                    >
                      <Download className="mr-2 h-4 w-4" /> Export{" "}
                      <span className="hidden sm:ml-[1ch] sm:inline-block">
                        {" "}
                        CSV
                      </span>
                    </Button>
                  </CSVLink>
                )}

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
            </header>

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
                  <TableHead>QTR1</TableHead>
                  <TableHead>QTR2</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>{renderSortedStudents()}</TableBody>

              <TableFooter></TableFooter>
            </Table>

            {studentDetails && (
              <SpecificStudentGradesModal studentDetails={studentDetails} />
            )}
          </main>
        </form>
      </Form>
    </Dialog>
  );
}
