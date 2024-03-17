import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { getAllArchivedAdminsEndpoint } from "@/config/adminEndpoints";

const AllAdminsContext = createContext();

export const useAllArchivedAdmins = () => {
  const context = useContext(AllAdminsContext);
  if (!context) {
    throw new Error(
      "useAllArchivedAdmins must be used within an AllAdminsProvider",
    );
  }
  return context;
};

export const AllAdminsProvider = ({ children }) => {
  const [allAdmins, setAllAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(getAllArchivedAdminsEndpoint);
      if (response.status === 200) {
        setAllAdmins(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching all admins:", error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []); // Fetch data on mount

  const refetchAdmins = () => {
    fetchAdmins(); // Re-fetch data
  };

  return (
    <AllAdminsContext.Provider
      value={{
        allAdmins,
        refetchAdmins,
        loading,
        error,
      }}
    >
      {children}
    </AllAdminsContext.Provider>
  );
};
