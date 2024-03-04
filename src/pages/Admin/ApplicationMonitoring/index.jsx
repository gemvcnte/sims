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
import RejectedApplicationsDataTable from "./components/RejectedApplicationsDataTable";
import { RejectedApplicationsProvider } from "./hooks/useRejectedApplications";
import ApprovedApplicationsDataTable from "./components/ApprovedApplicationsDataTable";
import { ApprovedApplicationsProvider } from "./hooks/useApprovedApplications";

export default function ApplicationMonitoring() {
  const [selectedStatus, setSelectedStatus] = useState("PENDING");

  // Function to handle the change of select value
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  return (
    <>
      <PendingApplicationsProvider>
        <RejectedApplicationsProvider>
          <ApprovedApplicationsProvider>
            <main className="w-full">
              <Topbar>STUDENT APPLICATION MONITORING</Topbar>

              <section className="px-4 pt-4">
                <Select
                  defaultValue="PENDING"
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="flex w-auto items-center gap-2">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="PENDING">
                        Pending Applications
                      </SelectItem>
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
              {selectedStatus === "REJECTED" && (
                <RejectedApplicationsDataTable />
              )}
              {selectedStatus === "ENROLLED" && (
                <ApprovedApplicationsDataTable />
              )}
              {selectedStatus === "ALL" && <div>all applications</div>}
            </main>
          </ApprovedApplicationsProvider>
        </RejectedApplicationsProvider>
      </PendingApplicationsProvider>
    </>
  );
}
