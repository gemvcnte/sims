import { createContext, useContext, useState } from "react";
import axios from "axios";
import axiosInstance from "@/utils/axios";
import { getStudentsInSpecificClassEndpoint } from "@/config/adminEndpoints";

const StudentsInSpecificClassContext = createContext();

export const useStudentsInSpecificClass = () => {
  const context = useContext(StudentsInSpecificClassContext);
  if (!context) {
    throw new Error(
      "useStudentsInSpecificClass must be used within a StudentsInSpecificClassProvider",
    );
  }
  return context;
};

export const StudentsInSpecificClassProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudentsInSpecificClass = async (sectionId) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        getStudentsInSpecificClassEndpoint,
        {
          sectionId,
        },
      );
      setStudents(response.data.students);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refetchStudentsInSpecificClass = () => {
    fetchStudentsInSpecificClass(); // Re-fetch data
  };

  return (
    <StudentsInSpecificClassContext.Provider
      value={{
        students,
        loading,
        error,
        fetchStudentsInSpecificClass,
        refetchStudentsInSpecificClass,
      }}
    >
      {children}
    </StudentsInSpecificClassContext.Provider>
  );
};