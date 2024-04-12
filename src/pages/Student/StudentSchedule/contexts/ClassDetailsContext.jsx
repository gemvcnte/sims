// ClassDetailsContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { getStudentAssignedClassEndpoint } from "@/config/studentEndpoints";

const ClassDetailsContext = createContext();

const ClassDetailsProvider = ({ children }) => {
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [
    schoolYearAndSemesterSelectOptions,
    setSchoolYearAndSemesterSelectOptions,
  ] = useState(null);

  const storeAvailableSchoolYearAndSemesterOptions = async (sortedClasses) => {
    try {
      const options = sortedClasses.map((classItem) => ({
        schoolYear: classItem.schoolYear,
        semester: classItem.semester,
      }));

      // Removing duplicate options
      const uniqueOptions = options.filter(
        (option, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.schoolYear === option.schoolYear &&
              t.semester === option.semester,
          ),
      );

      setSchoolYearAndSemesterSelectOptions(uniqueOptions);
    } catch (error) {
      console.error("Error fetching class details:", error);
    }
  };

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axiosInstance(getStudentAssignedClassEndpoint);
        const fetchedClass = response.data.data;

        const sortedClasses = [...fetchedClass].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        const mostLatestClass = sortedClasses[0];
        setClassDetails(mostLatestClass);

        await storeAvailableSchoolYearAndSemesterOptions(sortedClasses);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, []);

  useEffect(() => {
    console.log(
      `schoolYearAndSemesterSelectOptions`,
      schoolYearAndSemesterSelectOptions,
    );
  }, [schoolYearAndSemesterSelectOptions]);

  return (
    <ClassDetailsContext.Provider
      value={{
        classDetails,
        loading,
        setClassDetails,
        schoolYearAndSemesterSelectOptions,
        // fetchClassDetails,
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
    setClassDetails,
    fetchClassDetails,
    schoolYearAndSemesterSelectOptions,
  } = useContext(ClassDetailsContext);

  return {
    classDetails,
    loading,
    setClassDetails,
    fetchClassDetails,
    schoolYearAndSemesterSelectOptions,
  };
};

export { ClassDetailsProvider, useClassDetails };
