import React, { useEffect, useState } from "react";
import { useSidebarContext } from "@contexts/SidebarContext";
import axios from "axios";
import StudentCard from "./components/StudentCard";
import StudentDataModal from "./components/StudentDataModal";
import {
  sendUpdateRequest,
  updateLocalApplicationState,
  handleUpdateError,
} from "@utils/applicationMonitoringUtils";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Topbar from "@/components/layout/Topbar";
import { getPendingApplicationsEndpoint } from "@/config/adminEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";
import { StudentApplicationsDataTable } from "./components/StudentApplicationsDataTable";
import { PendingApplicationsProvider } from "./hooks/usePendingApplications";

export default function ApplicationMonitoring() {
  const { toggleSidebar } = useSidebarContext();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchPendingApplications = async () => {
      try {
        const response = await axios.get(
          getPendingApplicationsEndpoint,
          getAuthHeaders(),
        );

        setPendingApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching pending applications:", error.message);
      }
    };
    ``;
    fetchPendingApplications();
  }, []);

  const sortedPendingApplications = [...pendingApplications].sort((a, b) => {
    const lastNameA = a.lastName.toLowerCase();
    const lastNameB = b.lastName.toLowerCase();

    if (lastNameA < lastNameB) return -1;
    if (lastNameA > lastNameB) return 1;
    return 0;
  });

  const handleCardClick = (application) => {
    setSelectedApplication(application);
  };

  const handleSaveChanges = async (editedApplication) => {
    try {
      const studentApplicationId = editedApplication._id;
      const updateResponse = await sendUpdateRequest(
        studentApplicationId,
        editedApplication,
      );

      updateLocalApplicationState(
        studentApplicationId,
        editedApplication,
        setPendingApplications,
        setSelectedApplication,
      );
    } catch (error) {
      handleUpdateError(error);
    }
  };

  const handleModalClose = () => {
    setSelectedApplication(null);
  };

  return (
    <>
      <PendingApplicationsProvider>
        <Topbar>STUDENT APPLICATION MONITORING</Topbar>
        <main className="flex flex-col gap-2 px-4 py-2">
          {/* <StudentApplicationsDataTable /> */}
        </main>
      </PendingApplicationsProvider>
    </>
  );
}