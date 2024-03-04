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
  const [pendingApplications, setPendingApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/get-pending");
        if (!response.ok) {
          throw new Error("Failed to fetch pending applications");
        }
        const data = await response.json();
        setPendingApplications(data.data);
      } catch (error) {
        console.error("Error fetching pending applications:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  const filterBySchoolYear = (year) => {
    const filtered = pendingApplications.filter((application) =>
      application.schoolYear.some((schoolYear) => schoolYear.year === year),
    );
    setPendingApplications(filtered);
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
