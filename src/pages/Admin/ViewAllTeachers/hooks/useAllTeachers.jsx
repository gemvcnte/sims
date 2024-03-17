import { getALlTeachers } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

export default function useAllTeachers() {
  const [allTeachers, setAllTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeachers = async () => {
    try {
      const response = await axiosInstance.get(getALlTeachers);

      if (response.status === 200) {
        setAllTeachers(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []); // Fetch data on mount

  const refetchTeachers = () => {
    fetchTeachers(); // Re-fetch data
  };

  return { allTeachers, loading, error, refetchTeachers };
}
