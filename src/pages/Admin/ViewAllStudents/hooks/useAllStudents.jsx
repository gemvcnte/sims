import { getAllStudentsEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

export default function useAllStudents() {
  const [originalAllStudents, setOriginalAllStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get(getAllStudentsEndpoint);

      if (response.status === 200) {
        setOriginalAllStudents(response.data.data);
        setAllStudents(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const refetchStudents = () => {
    fetchStudents();
  };

  const filterStudents = ({ schoolYear, semester, gradeLevel, strand }) => {
    let filtered = originalAllStudents;

    if (schoolYear !== "all") {
      filtered = filtered.filter((application) =>
        application.schoolYear.some(
          (schoolYearItem) => schoolYearItem.year === schoolYear,
        ),
      );
    }

    if (semester !== "all") {
      filtered = filtered.filter((application) =>
        application.schoolYear.some(
          (schoolYearItem) => schoolYearItem.semester === semester,
        ),
      );
    }

    if (gradeLevel !== "") {
      const gradeLevelNum = parseInt(gradeLevel, 10);
      console.log("Filter Grade Level:", gradeLevelNum); // Log the filter value
      filtered = filtered.filter((application) =>
        application.schoolYear.some((schoolYearItem) => {
          console.log("Data Grade Level:", schoolYearItem.gradeLevel); // Log the data value
          return schoolYearItem.gradeLevel === gradeLevelNum;
        }),
      );
    }

    if (strand !== "all") {
      filtered = filtered.filter((application) =>
        application.schoolYear.some(
          (schoolYearItem) => schoolYearItem.strand === strand,
        ),
      );
    }

    console.log(filtered);
    setAllStudents(filtered);
  };

  return { allStudents, filterStudents, refetchStudents, loading, error };
}
