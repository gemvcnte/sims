import { getClassesEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const PendingApplicationsContext = createContext();

export const useSections = () => {
  const context = useContext(PendingApplicationsContext);
  if (!context) {
    throw new Error("useSections must be used within a SectionsProvider");
  }
  return context;
};

export const SectionsProvider = ({ children }) => {
  const [originalPendingApplications, setOriginalPendingApplications] =
    useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on mount

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(getClassesEndpoint);

      const responseData = response.data.data;
      setOriginalPendingApplications(responseData);
      setPendingApplications(responseData);
    } catch (error) {
      console.error("Error fetching pending applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const refetchData = () => {
    fetchData(); // Re-fetch data
  };

  const filterApplications = ({ schoolYear, semester, gradeLevel, strand }) => {
    let filtered = originalPendingApplications;

    if (schoolYear !== "all") {
      filtered = filtered.filter(
        (application) => application.schoolYear === schoolYear,
      );
    }

    if (semester !== "all") {
      filtered = filtered.filter(
        (application) => application.semester === semester,
      );
    }

    if (gradeLevel !== "") {
      const gradeLevelNum = parseInt(gradeLevel, 10);
      filtered = filtered.filter(
        (application) => application.gradeLevel === gradeLevelNum,
      );
    }

    if (strand !== "all") {
      filtered = filtered.filter(
        (application) => application.strand === strand,
      );
    }

    console.log(filtered);
    setPendingApplications(filtered);
  };

  return (
    <PendingApplicationsContext.Provider
      value={{
        pendingApplications,
        refetchData,
        filterApplications,
        loading,
        error,
      }}
    >
      {children}
    </PendingApplicationsContext.Provider>
  );
};