import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSidebarContext } from "@contexts/SidebarContext.jsx";
import axios from "axios";
import StudentCard from "./components/StudentCard";
import StudentDataModal from "./components/StudentDataModal";
import config from "@src/config";

const sendUpdateRequest = async (studentApplicationId, updatedData) => {
  try {
    const response = await axios.post(`${baseUrl}/admin/updateApplication`, {
      studentApplicationId,
      updatedData,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateLocalApplicationState = (
  studentApplicationId,
  updatedApplication,
) => {
  setPendingApplications((previousApplications) => {
    const updatedApplications = previousApplications.map((application) =>
      application._id === studentApplicationId
        ? updatedApplication
        : application,
    );
    return updatedApplications;
  });

  setSelectedApplication(null);
};

const handleUpdateError = (error) => {
  console.error("Error updating application:", error.message);
};

const fetchPendingApplications = async () => {
  try {
    const response = await axios.get("http://localhost:5000/admin/getPending");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching pending applications:", error.message);
    return [];
  }
};

const ApplicationMonitoring = () => {
  const baseUrl = config.development.baseUrl;

  const { toggleSidebar } = useSidebarContext();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const loadPendingApplications = async () => {
      const applications = await fetchPendingApplications();
      setPendingApplications(applications);
    };

    loadPendingApplications();
  }, []);

  const handleCardClick = (application) => {
    setSelectedApplication(application);
  };

  const handleModalClose = () => {
    setSelectedApplication(null);
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
};

export default ApplicationMonitoring;
