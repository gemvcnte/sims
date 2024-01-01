// TeacherClassesTable.js
import React from "react";
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
import { useFilteredClassesContext } from "../contexts/FilteredClassesContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TeacherClassesTable() {
  const { filterSections } = useFilteredClassesContext();
  const filteredClasses = filterSections();
  const navigate = useNavigate();

  const navigateToClass = (classId) => {
    navigate(`/class/${classId}`);
  };

  return (
    <main className="px-4">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span className="hidden sm:inline-block">Section</span> Name
            </TableHead>
            <TableHead>Adviser</TableHead>
            <TableHead className="hidden sm:table-cell">Students</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClasses.map((section) => (
            <TableRow
              key={section._id}
              className="group transition-all duration-700 hover:cursor-pointer"
              onClick={() => navigateToClass(section._id)}
            >
              <TableCell className="uppercase">{section.sectionName}</TableCell>
              <TableCell>{section.adviser}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {section.students.length}
              </TableCell>
              <TableCell className="inline-block">
                <span className="border-b border-background py-1 hover:border-foreground">
                  View <span className="hidden sm:inline-block">Section</span>
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
