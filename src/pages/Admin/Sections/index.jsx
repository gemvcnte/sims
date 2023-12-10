import Topbar from "@/components/layout/Topbar";
import React from "react";
import { SectionAnalytics, SectionCard, SectionFilter } from "./components";
import useSection from "./hooks/useSection";

export default function Sections() {
  const { sections, loading, error } = useSection();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="w-full">
      <Topbar>SECTIONS</Topbar>

      <SectionAnalytics />
      <SectionFilter />

      <section className="flex flex-col gap-4 px-4">
        {sections.map((section) => (
          <SectionCard
            key={section._id}
            sectionName={section.sectionName}
            adviser={section.adviser}
            totalStudents={section.students.length}
          />
        ))}
      </section>
    </main>
  );
}
