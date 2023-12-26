import { useEffect, useState } from "react";
import axios from "axios";
import getAuthHeaders from "@/utils/getAuthHeaders";

const useGetAllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/teacher/get-all-teachers",
          getAuthHeaders(),
        );

        setTeachers(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { teachers, loading, error };
};

export default useGetAllTeachers;
