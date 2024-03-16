import {
  getAllArchivedStudentsEndpoint,
  getAllStudentsEndpoint,
} from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AllStudentsContext = createContext();

export const useAllStudents = () => {
  const context = useContext(AllStudentsContext);
  if (!context) {
    throw new Error(
      "useAllStudents must be used within an AllStudentsProvider",
    );
  }
  return context;
};

export const AllStudentsProvider = ({ children }) => {
  const [originalAllStudents, setOriginalAllStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []); // Fetch data on mount

  const fetchStudents = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(getAllArchivedStudentsEndpoint);

      const responseData = response.data.data;
      setOriginalAllStudents(responseData);
      setAllStudents(responseData);
    } catch (error) {
      console.error("Error fetching all students:", error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const refetchStudents = () => {
    fetchStudents(); // Re-fetch data
  };

  const filterStudents = ({ schoolYear, semester, gradeLevel, strand }) => {
    let filtered = originalAllStudents;

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
      filtered = filtered.filter((application) =>
        application.schoolYear.some(
          (schoolYearItem) => schoolYearItem.gradeLevel === gradeLevelNum,
        ),
      );
    }

    if (strand !== "all") {
      filtered = filtered.filter((application) =>
        application.schoolYear.some(
          (schoolYearItem) => schoolYearItem.strand === strand,
        ),
      );
    }

    setAllStudents(filtered);
  };

  return (
    <AllStudentsContext.Provider
      value={{
        allStudents,
        refetchStudents,
        filterStudents,
        loading,
        error,
      }}
    >
      {children}
    </AllStudentsContext.Provider>
  );
};
