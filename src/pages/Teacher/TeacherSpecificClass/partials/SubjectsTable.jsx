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
import { Icon } from "@iconify/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddSubjectModal from "./AddSubjectModal";

export default function SubjectsTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;

  console.log(classDetails);

  const [formData, setFormData] = useState({
    classId: "yourClassId",
    subjectName: "",
    subjectTeacher: "",
    day: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://your-api-base-url/api/class/add-subject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        // Handle error
        console.error("Error:", response.statusText);
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      // Handle error
      console.error("Error:", error.message);
    }
  };

  return (
    <main className="p-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="mb-4 flex gap-4">
            <Button variant="outline">Add Subject</Button>
          </div>
        </DialogTrigger>
        <AddSubjectModal />
      </Dialog>

      <Table>
        {/* <TableCaption className="pb-4">No Subjects Found</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Subject Name</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classDetails.subjects.map((subject) => (
            <TableRow key={subject._id}>
              <TableCell className="font-medium">
                {subject.subjectName}
              </TableCell>
              <TableCell>{subject.subjectTeacher}</TableCell>
              <TableCell className="inline-block">
                Update <span className="hidden sm:inline">Subject</span>
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
