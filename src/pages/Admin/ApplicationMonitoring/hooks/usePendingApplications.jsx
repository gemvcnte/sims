import axiosInstance from "@/utils/axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const PendingApplicationsContext = createContext();

export const usePendingApplications = () => {
  const context = useContext(PendingApplicationsContext);
  if (!context) {
    throw new Error(
      "usePendingApplications must be used within a PendingApplicationsProvider",
    );
  }
  return context;
};

export const PendingApplicationsProvider = ({ children }) => {
  const [originalPendingApplications, setOriginalPendingApplications] =
    useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on mount

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:5000/admin/get-pending",
      );

      const responseData = response.data.data;
      setOriginalPendingApplications(responseData);
      setPendingApplications(responseData);
    } catch (error) {
      console.error("Error fetching pending applications:", error);
    }
  };

  const refetchData = () => {
    fetchData(); // Re-fetch data
  };

  const filterBySchoolYear = (year) => {
    if (year === "all") {
      setPendingApplications(originalPendingApplications);
    } else {
      const filtered = originalPendingApplications.filter((application) =>
        application.schoolYear.some((schoolYear) => schoolYear.year === year),
      );
      setPendingApplications(filtered);
    }
  };

  const filterBySemester = (semester) => {
    const filtered = pendingApplications.filter((application) =>
      application.schoolYear.some(
        (schoolYear) => schoolYear.semester === semester,
      ),
    );
    setPendingApplications(filtered);
  };

  const filterByGradeLevel = (gradeLevel) => {
    const filtered = pendingApplications.filter((application) =>
      application.schoolYear.some(
        (schoolYear) => schoolYear.gradeLevel === gradeLevel,
      ),
    );
    setPendingApplications(filtered);
  };

  const filterByStrand = (strand) => {
    const filtered = pendingApplications.filter((application) =>
      application.schoolYear.some((schoolYear) => schoolYear.strand === strand),
    );
    setPendingApplications(filtered);
  };

  return (
    <PendingApplicationsContext.Provider
      value={{
        pendingApplications,
        refetchData,
        filterBySchoolYear,
        filterBySemester,
        filterByGradeLevel,
        filterByStrand,
      }}
    >
      {children}
    </PendingApplicationsContext.Provider>
  );
};
