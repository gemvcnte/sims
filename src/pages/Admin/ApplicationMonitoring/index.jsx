import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSidebarContext } from "@contexts/SidebarContext.jsx";
import axios from "axios";
import StudentCard from "./components/StudentCard";
import StudentDataModal from "./components/StudentDataModal";
import {
  sendUpdateRequest,
  updateLocalApplicationState,
  handleUpdateError,
} from "@utils/applicationMonitoringUtils";

export default function ApplicationMonitoring() {
  const { toggleSidebar } = useSidebarContext();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchPendingApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/getPending",
        );
        setPendingApplications(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching pending applications:", error.message);
      }
    };

    fetchPendingApplications();
  }, []);

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
      <section className="w-full">
        {selectedApplication && (
          <StudentDataModal
            application={selectedApplication}
            onSave={handleSaveChanges}
            onClose={handleModalClose}
          />
        )}
        <header className="mx-4 flex justify-between border-b border-white-700 py-8 italic">
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
          {pendingApplications.map((application) => (
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
