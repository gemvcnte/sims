import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { getALlTeachers } from "@/config/adminEndpoints";

const AllTeachersContext = createContext();

export const useAllTeachers = () => {
  const context = useContext(AllTeachersContext);
  if (!context) {
    throw new Error(
      "useAllTeachers must be used within an AllTeachersProvider",
    );
  }
  return context;
};

export const AllTeachersProvider = ({ children }) => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(getALlTeachers);
      if (response.status === 200) {
        setAllTeachers(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching all teachers:", error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []); // Fetch data on mount

  const refetchTeachers = () => {
    fetchTeachers(); // Re-fetch data
  };

  return (
    <AllTeachersContext.Provider
      value={{
        allTeachers,
        refetchTeachers,
        loading,
        error,
      }}
    >
      {children}
    </AllTeachersContext.Provider>
  );
};
