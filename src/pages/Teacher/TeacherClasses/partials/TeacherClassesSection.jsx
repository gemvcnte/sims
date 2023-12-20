import React from "react";
import { useAssignedClasses } from "../hooks";
import showErrorNotification from "@/utils/ShowErrorNotification";

export default function TeacherClassesSection() {
  const { assignedClasses, loading, error } = useAssignedClasses();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <ul>
        {assignedClasses.map((assignedClass) => (
          <li key={assignedClass._id}>
            <strong>{assignedClass.sectionName}</strong> - Grade
            {assignedClass.gradeLevel}
            <ul>
              {assignedClass.students.map((student) => (
                <li key={student._id}>
                  {student.firstName} {student.lastName}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
