// ClassDetailsContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import getAuthHeaders from "@/utils/getAuthHeaders";

const ClassDetailsContext = createContext();

const ClassDetailsProvider = ({ children }) => {
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchClassDetails = async () => {
    if (id) {
      try {
        const response = await axios.get(
          `http://localhost:5000/teacher/class/get-specific-class/${id}`,
          getAuthHeaders(),
        );
        setClassDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    }
  };

  useEffect(() => {
    fetchClassDetails();
  }, [id]);

  return (
    <ClassDetailsContext.Provider
      value={{
        classDetails,
        loading,
        currentId: id,
        setClassDetails,
        fetchClassDetails,
      }}
    >
      {children}
    </ClassDetailsContext.Provider>
  );
};

const useClassDetails = () => {
  const {
    classDetails,
    loading,
    currentId,
    setClassDetails,
    fetchClassDetails,
  } = useContext(ClassDetailsContext);

  return {
    classDetails,
    loading,
    currentId,
    setClassDetails,
    fetchClassDetails,
  };
};

export { ClassDetailsProvider, useClassDetails };
