// ClassDetailsContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";

const ClassDetailsContext = createContext();

const ClassDetailsProvider = ({ children }) => {
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClassDetails = async () => {
    try {
      const response = await axiosInstance(
        `http://localhost:5000/student/class/assigned-class`,
      );
      setClassDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching class details:", error);
    }
  };

  useEffect(() => {
    fetchClassDetails();
  }, []);

  return (
    <ClassDetailsContext.Provider
      value={{
        classDetails,
        loading,
        setClassDetails,
        fetchClassDetails,
      }}
    >
      {children}
    </ClassDetailsContext.Provider>
  );
};

const useClassDetails = () => {
  const { classDetails, loading, setClassDetails, fetchClassDetails } =
    useContext(ClassDetailsContext);

  return {
    classDetails,
    loading,
    setClassDetails,
    fetchClassDetails,
  };
};

export { ClassDetailsProvider, useClassDetails };