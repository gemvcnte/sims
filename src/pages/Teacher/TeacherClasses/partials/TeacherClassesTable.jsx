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
import { useAssignedClasses } from "../hooks";

export default function TeacherClassesTable() {
  const { assignedClasses, loading, error } = useAssignedClasses();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const sectionsData = assignedClasses;

  return (
    <main className="px-4">
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
