import { useState, useEffect } from "react";
import axios from "axios";
import { globalSettingsEndpoint } from "@/config/adminEndpoints";

const useGlobalSettings = () => {
  const [globalSettings, setGlobalSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const response = await axios.get(globalSettingsEndpoint);
        setGlobalSettings(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalSettings();
  }, []);

  return { globalSettings, loading, error };
};

export default useGlobalSettings;
