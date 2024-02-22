import { globalSettingsEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";
import { useState, useEffect } from "react";

const useGlobalSettings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const response = await axiosInstance.get(globalSettingsEndpoint);
        const data = response.data;

        localStorage.setItem("globalSettings", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGlobalSettings();
  }, []);

  const updateGlobalSettings = async (updatedSettings) => {
    try {
      localStorage.setItem("globalSettings", JSON.stringify(updatedSettings));

      const response = await axiosInstance.patch(
        globalSettingsEndpoint,
        updatedSettings,
      );
      console.log(response);
    } catch (error) {
      console.error("Error updating global settings:", error);
    }
  };

  return { loading, error, updateGlobalSettings };
};

export default useGlobalSettings;
