import React, { useState } from "react";
import { StudentsInSpecificClassProvider } from "./useStudentsInSpecificClass";
import StudentsInClassDataTable from "./StudentsInClassDataTable.jsx";
import { useClassDetails } from "../../contexts/ClassDetailsContext";
import { isClassAdviser } from "../../helpers/isClassAdviser";
import { Button } from "@/components/ui/button";

export default function StudentsTable() {
  const [isEditing, setIsEditing] = useState(false);

  const classDetailsContext = useClassDetails();
  const { classDetails, loading, fetchClassDetails } = classDetailsContext;
  const isAdviser = isClassAdviser(classDetails);

  return (
    <main className="p-4">
      <StudentsInSpecificClassProvider>
        {isAdviser && (
          <div className="mb-4 flex gap-4">
            <Button
              variant="outline"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Cancel Editing" : "Edit Students"}
            </Button>
            {isEditing && <Button>Save Changes</Button>}
          </div>
        )}

        <StudentsInClassDataTable />
      </StudentsInSpecificClassProvider>
    </main>
  );
}
