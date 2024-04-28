import { getClassesEndpoint } from "@/config/adminEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";
import { useEffect, useState } from "react";

export default function useSection() {
  const { getCookie } = useCookie();

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = getCookie("authToken");

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(getClassesEndpoint, getAuthHeaders());
        const data = await response.json();

        if (response.ok) {
          setSections(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("An error occurred while fetching sections.");
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  return { sections, loading, error };
}
