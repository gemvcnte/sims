import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSidebarContext } from "@contexts/SidebarContext";
import axios from "axios";
import StudentCard from "./components/StudentCard";
import StudentDataModal from "./components/StudentDataModal";
import {
  sendUpdateRequest,
  updateLocalApplicationState,
  handleUpdateError,
} from "@utils/applicationMonitoringUtils";
import { getBaseUrl } from "@src/utils/configUtils";

export default function ApplicationMonitoring() {
  const baseUrl = getBaseUrl();
  const { toggleSidebar } = useSidebarContext();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchPendingApplications = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/getPending`);
        setPendingApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching pending applications:", error.message);
      }
    };

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
      <section className="w-full">
        {selectedApplication && (
          <StudentDataModal
            application={selectedApplication}
            onSave={handleSaveChanges}
            onClose={handleModalClose}
          />
        )}
        <header className="border-white-700 mx-4 flex justify-between border-b py-8 italic">
          <Icon
            icon="heroicons-outline:menu-alt-2"
            width="24"
            height="24"
            className="cursor-pointer lg:hidden"
            onClick={toggleSidebar}
          />
          <span>STUDENT APPLICATION MONITORING</span>
          <span></span>
        </header>

        <main className="flex flex-col gap-4 p-4">
          {sortedPendingApplications.map((application) => (
            <StudentCard
              key={application._id}
              application={application}
              onClick={() => handleCardClick(application)}
            />
          ))}
        </main>
      </section>
    </>
  );
}
