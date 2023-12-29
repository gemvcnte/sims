import React from "react";
import { Button } from "@/components/ui/button";

export default function TeacherClassCard({ sectionName }) {
  return (
    <section className="flex w-full items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <span className="font-bold uppercase">{sectionName}</span>
      <Button variant="ghost">Edit</Button>
    </section>
  );
}
