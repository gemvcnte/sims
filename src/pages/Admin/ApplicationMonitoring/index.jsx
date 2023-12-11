import React, { useEffect, useState } from "react";
import { useSidebarContext } from "@contexts/SidebarContext.jsx";
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

export default function ApplicationMonitoring() {
  const { toggleSidebar } = useSidebarContext();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchPendingApplications = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const response = await axios.get(getPendingApplicationsEndpoint, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setPendingApplications(response.data.data);
        console.log(response.data.data);
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
    console.log(application);
  };

  const handleSaveChanges = async (editedApplication) => {
    try {
      const studentApplicationId = editedApplication._id;
      const updateResponse = await sendUpdateRequest(
        studentApplicationId,
        editedApplication,
      );
      console.log(updateResponse);

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
      <Dialog onOpenChange={setSelectedApplication}>
        <section className="w-full">
          {selectedApplication && (
            <StudentDataModal
              application={selectedApplication}
              onSave={handleSaveChanges}
              onClose={handleModalClose}
            />
          )}
          <Topbar>STUDENT APPLICATION MONITORING</Topbar>
          <main className="flex flex-col gap-2 px-4 py-2">
            {sortedPendingApplications.map((application) => (
              <StudentCard
                key={application._id}
                application={application}
                onClick={() => handleCardClick(application)}
              />
            ))}
          </main>
        </section>
      </Dialog>
    </>
  );
}
