import React from "react";
import { StudentsInSpecificClassProvider } from "./useStudentsInSpecificClass";
import StudentsInClassDataTable from "./StudentsInClassDataTable.jsx";

export default function StudentsTable() {
  return (
    <main className="p-4">
      <StudentsInSpecificClassProvider>
        <div>students table</div>
        <StudentsInClassDataTable />
      </StudentsInSpecificClassProvider>
    </main>
  );
}
