import React, { useEffect, useState } from "react";
import Topbar from "@/components/layout/Topbar";
import { PendingApplicationsProvider } from "./hooks/usePendingApplications";
import PendingApplicationsDataTable from "./components/PendingApplicationsDataTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ApplicationMonitoring() {
  const [selectedStatus, setSelectedStatus] = useState("PENDING");

  // Function to handle the change of select value
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  return (
    <>
      <PendingApplicationsProvider>
        <main className="w-full">
          <Topbar>STUDENT APPLICATION MONITORING</Topbar>

          <section className="px-4 pt-4">
            <Select defaultValue="PENDING" onValueChange={handleStatusChange}>
              <SelectTrigger className="flex w-auto items-center gap-2">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="PENDING">Pending Applications</SelectItem>
                  <SelectItem value="REJECTED">
                    Rejected Applications
                  </SelectItem>
                  <SelectItem value="ENROLLED">
                    Enrolled Applications
                  </SelectItem>
                  <SelectItem value="ALL">All Applications</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </section>

          {selectedStatus === "PENDING" && <PendingApplicationsDataTable />}
          {selectedStatus === "REJECTED" && <div>rejected</div>}
        </main>
      </PendingApplicationsProvider>
    </>
  );
}
