// FilteredClassesContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAssignedClassesContext } from "./AssignedClassesContext";
import { jwtDecode } from "jwt-decode";
import useGlobalSettings from "@/pages/Registration/useGlobalSettings";

const FilteredClassesContext = createContext();

export const FilteredClassesProvider = ({ children }) => {
  const { globalSettings, loading } = useGlobalSettings();

  const { assignedClasses } = useAssignedClassesContext();
  const [filter, setFilter] = useState("all");
  const [schoolYearFilter, setSchoolYearFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const user = getUserFromToken();

  if (!loading) {
    console.log(`global settings`, globalSettings);
    console.log(schoolYearFilter);
    console.log(semesterFilter);
  }

  // Update schoolYearFilter state once globalSettings is loaded
  useEffect(() => {
    if (!loading && globalSettings) {
      setSchoolYearFilter(globalSettings.schoolYear || "all");
      setSemesterFilter(globalSettings.semester || "all");
    }
  }, [loading, globalSettings]);

  const filterSections = () => {
    let filteredClasses = assignedClasses;

    if (filter !== "all") {
      if (filter === "advisory") {
        filteredClasses = assignedClasses.filter(
          (section) => section.adviser === user,
        );
      } else if (filter === "subjectTeacher") {
        filteredClasses = assignedClasses.filter(
          (section) => section.adviser !== user,
        );
      }
    }

    if (schoolYearFilter !== "all") {
      filteredClasses = filteredClasses.filter(
        (section) => section.schoolYear === schoolYearFilter,
      );
    }

    if (semesterFilter !== "all") {
      filteredClasses = filteredClasses.filter(
        (section) => section.semester === semesterFilter,
      );
    }

    return filteredClasses;
  };

  return (
    <FilteredClassesContext.Provider
      value={{
        filter,
        setFilter,
        schoolYearFilter,
        setSchoolYearFilter,
        filterSections,
        semesterFilter,
        setSemesterFilter,
      }}
    >
      {children}
    </FilteredClassesContext.Provider>
  );
};

export const useFilteredClassesContext = () => {
  return useContext(FilteredClassesContext);
};

// Function to extract user from the token using jwt-decode
function getUserFromToken() {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    try {
      const decodedToken = jwtDecode(authToken);
      return decodedToken.username;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }

  return { username: "" }; // Return an empty object or handle the case when decoding fails
}
