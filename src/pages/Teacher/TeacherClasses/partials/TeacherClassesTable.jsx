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

export default function TeacherClassesTable() {
  const { filterSections } = useFilteredClassesContext();
  const filteredClasses = filterSections();

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
            >
              <TableCell className="uppercase">{section.sectionName}</TableCell>
              <TableCell>{section.adviser}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {section.students.length}
              </TableCell>
              <TableCell className="inline-block">
                View <span className="hidden sm:inline-block">Section</span>
                <Icon
                  icon="octicon:arrow-down-24"
                  rotate={3}
                  className="inline-block -rotate-45 transform transition-all group-hover:rotate-45"
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
