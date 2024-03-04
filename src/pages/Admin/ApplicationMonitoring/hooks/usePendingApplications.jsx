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

  const filterApplications = ({ schoolYear, semester, gradeLevel, strand }) => {
    let filtered = originalPendingApplications;

    if (schoolYear !== "all") {
      filtered = filtered.filter((application) =>
        application.schoolYear.some(
          (schoolYearItem) => schoolYearItem.year === schoolYear,
        ),
      );
    }

    if (semester !== "all") {
      filtered = filtered.filter((application) =>
        application.schoolYear.some(
          (schoolYearItem) => schoolYearItem.semester === semester,
        ),
      );
    }

    if (gradeLevel !== "") {
      const gradeLevelNum = parseInt(gradeLevel, 10);
      console.log("Filter Grade Level:", gradeLevelNum); // Log the filter value
      filtered = filtered.filter((application) =>
        application.schoolYear.some((schoolYearItem) => {
          console.log("Data Grade Level:", schoolYearItem.gradeLevel); // Log the data value
          return schoolYearItem.gradeLevel === gradeLevelNum;
        }),
      );
    }

    if (strand !== "all") {
      filtered = filtered.filter((application) =>
        application.schoolYear.some(
          (schoolYearItem) => schoolYearItem.strand === strand,
        ),
      );
    }

    console.log(filtered);
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
        filterApplications,
        filterByStrand,
      }}
    >
      {children}
    </PendingApplicationsContext.Provider>
  );
};
