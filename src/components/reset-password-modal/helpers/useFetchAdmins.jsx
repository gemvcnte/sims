import { useEffect, useState } from "react";
import { adminsEndpoint, teachersEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";

export function useFetchAdmins() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const useFetchAdmins = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(adminsEndpoint);
        setTeachers(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    useFetchAdmins();
  }, []);

  return { teachers, loading, error };
}
