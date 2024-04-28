import React from "react";
import Topbar from "@/components/layout/Topbar";
import DashboardAnnouncementCard from "./partials/DashboardAnnouncementCard";
import ProfileProgressCard from "./partials/ProfileProgressCard";
import { useStudentProfile } from "../StudentProfile/components/StudentProfileDisplayAndEditSection/hooks";
import ScheduleTable from "./partials/ScheduleTable";
import { ClassDetailsProvider } from "./contexts/ClassDetailsContext";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentDashboard() {
  const { studentProfile, error, setStudentProfile } = useStudentProfile();

  const { user } = useAuth();

  const firstName = user?.name.split(" ")[0];

  return (
    <ClassDetailsProvider>
      <main className="w-full">
        <Topbar>
          {user?.username ? `Welcome, ${firstName}!` : "DASHBOARD"}
        </Topbar>
        {/* <Topbar>DASHBOARD</Topbar> */}
        <section className="flex flex-col gap-4 p-4 md:flex-row ">
          <ScheduleTable />
          <div className="order-1 flex min-w-[40%] flex-col gap-4 md:order-2 md:pr-4">
            <ProfileProgressCard />
            <DashboardAnnouncementCard />
          </div>
        </section>
      </main>
    </ClassDetailsProvider>
  );
}
