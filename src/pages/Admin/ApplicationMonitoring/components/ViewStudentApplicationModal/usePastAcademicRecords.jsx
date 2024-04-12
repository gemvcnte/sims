import { adminStudentsEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";
import React, { useEffect, useState } from "react";

export default function usePastAcademicRecords(lrn) {
  console.log(lrn);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${adminStudentsEndpoint}/${lrn}`,
      );

      if (response.status === 200) {
        console.log(`response`, response);
        setStudentData(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return { loading, error, studentData };
}
