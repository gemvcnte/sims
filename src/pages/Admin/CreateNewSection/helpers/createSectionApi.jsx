import { createClassEndpoint } from "@/config/adminEndpoints";
import axios from "axios";

const createSectionApi = async (sectionDetails) => {
  try {
    const response = await axios.post(createClassEndpoint, sectionDetails);

    if (response.status === 201) {
      return { success: true, message: response.data.message };
    } else {
      return {
        success: false,
        message: `Failed to create section. Status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error creating section:", error.message);
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export default createSectionApi;
