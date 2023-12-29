import React, { createContext, useContext, useEffect, useState } from "react";
import getTeacherAssignedClassesApi from "../helpers/getTeacherAssignedClassesApi";

const AssignedClassesContext = createContext();

export const AssignedClassesProvider = ({ children }) => {
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeacherAssignedClassesApi();
        setAssignedClasses(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AssignedClassesContext.Provider
      value={{ assignedClasses, loading, error }}
    >
      {children}
    </AssignedClassesContext.Provider>
  );
};

export const useAssignedClassesContext = () => {
  return useContext(AssignedClassesContext);
};
