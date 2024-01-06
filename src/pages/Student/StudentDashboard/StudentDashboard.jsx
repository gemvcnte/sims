import React from "react";
import Topbar from "@/components/layout/Topbar";
import DashboardAnnouncementCard from "./partials/DashboardAnnouncementCard";
import ProfileProgressCard from "./partials/ProfileProgressCard";
import { useStudentProfile } from "../StudentProfile/components/StudentProfileDisplayAndEditSection/hooks";

export default function StudentDashboard() {
  const { studentProfile, error, setStudentProfile } = useStudentProfile();

  return (
    <main className="w-full">
      <Topbar>DASHBOARD</Topbar>
      <section className="flex flex-col gap-4 p-4 md:flex-row">
        <ProfileProgressCard />
        <DashboardAnnouncementCard />
      </section>
    </main>
  );
}
