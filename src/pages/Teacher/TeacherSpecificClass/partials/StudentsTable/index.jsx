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
import updateStudentsInClassApi from "../../helpers/updateStudentsInClassApi";
import showSuccessNotification from "@/utils/ShowSuccessNotification";

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

  const handleSaveChanges = async () => {
    console.log(selectedLrns);
    try {
      if (classDetails) {
        // Remove duplicates from selectedLrns array
        const uniqueLrns = Array.from(new Set(selectedLrns));

        await updateStudentsInClassApi(classDetails._id, uniqueLrns);

        showSuccessNotification("Updated Successfully");
        // fetchClassDetails();
        setIsEditing(false);
        setSelectedStudents([]);
      }
    } catch (error) {
      console.error("Error updating students in class:", error);
    }
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
                <Button onClick={handleSaveChanges}>Save Changes</Button>
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
