import { useEffect, useState } from "react";
import { teachersEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";

export function useFetchTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const useFetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(teachersEndpoint);
        setTeachers(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    useFetchTeachers();
  }, []);

  return { teachers, loading, error };
}
