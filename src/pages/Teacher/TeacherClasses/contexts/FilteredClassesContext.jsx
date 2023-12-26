// FilteredClassesContext.js
import React, { createContext, useContext, useState } from "react";
import { useAssignedClassesContext } from "./AssignedClassesContext";
import { jwtDecode } from "jwt-decode";

const FilteredClassesContext = createContext();

export const FilteredClassesProvider = ({ children }) => {
  const { assignedClasses } = useAssignedClassesContext();
  const [filter, setFilter] = useState("all");
  const user = getUserFromToken();

  const filterSections = () => {
    if (filter === "all") {
      return assignedClasses;
    } else if (filter === "advisory") {
      return assignedClasses.filter((section) => section.adviser === user);
    } else if (filter === "subjectTeacher") {
      return assignedClasses.filter((section) => section.adviser !== user);
    } else {
      return assignedClasses;
    }
  };

  return (
    <FilteredClassesContext.Provider
      value={{ filter, setFilter, filterSections }}
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
