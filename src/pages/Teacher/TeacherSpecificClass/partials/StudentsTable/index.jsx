import React, { useState } from "react";
import { StudentsInSpecificClassProvider } from "./useStudentsInSpecificClass";
import StudentsInClassDataTable from "./StudentsInClassDataTable.jsx";
import { useClassDetails } from "../../contexts/ClassDetailsContext";
import { isClassAdviser } from "../../helpers/isClassAdviser";
import { Button } from "@/components/ui/button";
import {
  StudentsInClassAndNoClassProvider,
  useStudentsInClassAndNoClass,
} from "./useStudentsInClassAndNoClass";
import EditingStudentsInClassDataTable from "./EditingStudentsInClassDataTable.jsx";

export default function StudentsTable() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLrns, setSelectedLrns] = useState([]);

  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;
  const isAdviser = isClassAdviser(classDetails);

  const consoleLogAllLrns = () => {
    console.log(selectedLrns);
    setSelectedLrns([]);
    setIsEditing(false);
  };

  return (
    <main className="p-4">
      <StudentsInSpecificClassProvider>
        <StudentsInClassAndNoClassProvider>
          {isAdviser && (
            <div className="mb-4 flex gap-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? "Cancel Editing" : "Edit Students"}
              </Button>
              {isEditing && (
                <Button onClick={consoleLogAllLrns}>Save Changes</Button>
              )}
            </div>
          )}

          {isEditing ? (
            <EditingStudentsInClassDataTable
              setSelectedLrns={setSelectedLrns}
            />
          ) : (
            <StudentsInClassDataTable />
          )}
        </StudentsInClassAndNoClassProvider>
      </StudentsInSpecificClassProvider>
    </main>
  );
}
