// ClassDetailsContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import getAuthHeaders from "@/utils/getAuthHeaders";
import { getSpecificClassEndpoint } from "@/config/teacherEndpoints";
import axiosInstance from "@/utils/axios";
import useGlobalSettings from "@/pages/Registration/useGlobalSettings";

const ClassDetailsContext = createContext();

const ClassDetailsProvider = ({ children }) => {
  const { globalSettings, loading: globalSettingsLoading } =
    useGlobalSettings();

  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnCurrentSemester, setIsOnCurrentSemester] = useState(false);
  const { id } = useParams();

  const fetchClassDetails = async () => {
    if (id) {
      try {
        const response = await axiosInstance(
          `${getSpecificClassEndpoint}/${id}`,
        );

        const classData = response.data.data;

        setClassDetails(classData);
        setIsOnCurrentSemester(
          isClassOnCurrentSemester(classData, globalSettings),
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class details:", error);
        setClassDetails(null);
        setLoading(false);
      }
    }
  };

  const isClassOnCurrentSemester = (classDetails, globalSettings) => {
    if (!classDetails || !globalSettings) {
      return false;
    }
    return (
      globalSettings.schoolYear === classDetails.schoolYear &&
      globalSettings.semester == classDetails.semester
    );
  };

  useEffect(() => {
    if (!globalSettingsLoading) {
      fetchClassDetails();
    }
  }, [id, globalSettingsLoading]);

  return (
    <ClassDetailsContext.Provider
      value={{
        classDetails,
        loading,
        currentId: id,
        setClassDetails,
        fetchClassDetails,
        isOnCurrentSemester,
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
    isOnCurrentSemester,
  } = useContext(ClassDetailsContext);

  return {
    classDetails,
    loading,
    currentId,
    setClassDetails,
    fetchClassDetails,
    isOnCurrentSemester,
  };
};

export { ClassDetailsProvider, useClassDetails };
