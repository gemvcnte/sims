import { useEffect, useState } from "react";

export default function useSection() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/class/getAll",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
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
