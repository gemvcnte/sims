import { getAllStudentsEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

export default function useAllStudents() {
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

  return { allStudents, refetchStudents, loading, error };
}
