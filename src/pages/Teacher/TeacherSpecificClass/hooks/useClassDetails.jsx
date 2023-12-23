// useClassDetails.js
import { useEffect, useState } from "react";
import axios from "axios";

const useClassDetails = (id) => {
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/teacher/class/get-specific-class/${id}`,
        );
        setClassDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchData();
  }, [id]);

  return { classDetails, loading };
};

export default useClassDetails;
