import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

export default function useAllTeachers() {
  const [allTeachers, setAllTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:5000/admin/get-teachers`,
        );

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

    fetchTeachers();
  }, []);

  return { allTeachers, loading, error };
}
