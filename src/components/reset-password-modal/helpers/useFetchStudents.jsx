// useFetchStudents.js

import { useEffect, useState } from "react";
import { StudentsEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";

export function useFetchStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const useFetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(StudentsEndpoint);
        setStudents(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    useFetchStudents();
  }, []);

  return { students, loading, error };
}
