import { useEffect, useState } from "react";
import getTeacherAssignedClassesApi from "../helpers/getTeacherAssignedClassesApi";

export default function useAssignedClasses() {
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeacherAssignedClassesApi();
        setAssignedClasses(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { assignedClasses, loading, error };
}
