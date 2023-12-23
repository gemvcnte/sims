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

const sectionsData = [
  {
    _id: "6582fa9eb4e1c7d90680b4e8",
    sectionName: "12-ninja",
    gradeLevel: 12,
    adviser: "joshuagem.vicente",
    strand: "STEM",
    students: [],
    subjectTeachers: [],
    createdAt: "2023-12-20T14:30:54.316Z",
    updatedAt: "2023-12-20T14:30:54.316Z",
    __v: 0,
  },
  {
    _id: "6582fd93b4e1c7d90680b51a",
    sectionName: "12-pacific",
    gradeLevel: 12,
    adviser: "joshuagem.vicente",
    strand: "TVL-ICT",
    students: [],
    subjectTeachers: [],
    createdAt: "2023-12-20T14:43:31.569Z",
    updatedAt: "2023-12-20T14:43:31.569Z",
    __v: 0,
  },
];

export default function TeacherClassesTable() {
  return (
    <main className="mt-4 px-4">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Section Name</TableHead>
            <TableHead>Adviser</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sectionsData.map((section) => (
            <TableRow
              key={section._id}
              className="group transition-all duration-700 hover:cursor-pointer"
            >
              <TableCell className="uppercase">{section.sectionName}</TableCell>
              <TableCell>{section.adviser}</TableCell>
              <TableCell className="flex items-center gap-2">
                View Section
                <Icon
                  icon="octicon:arrow-down-24"
                  rotate={3}
                  className="-rotate-45 transform transition-all group-hover:rotate-45"
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
