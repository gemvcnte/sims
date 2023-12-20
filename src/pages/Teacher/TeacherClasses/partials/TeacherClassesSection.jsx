import React from "react";
import { useAssignedClasses } from "../hooks";
import TeacherClassCard from "./TeacherClassCard";

export default function TeacherClassesSection() {
  const { assignedClasses, loading, error } = useAssignedClasses();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="px-4">
      <div className="flex flex-col gap-4">
        {assignedClasses.map((assignedClass) => (
          <TeacherClassCard
            sectionName={assignedClass.sectionName}
            key={assignedClass._id}
          />
        ))}
      </div>
    </section>
  );
}
