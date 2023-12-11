import { createClassEndpoint } from "@/config/adminEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";
import axios from "axios";

const createSectionApi = async (sectionDetails) => {
  try {
    const response = await axios.post(
      createClassEndpoint,
      sectionDetails,
      getAuthHeaders(),
    );

    if (response.status === 201) {
      return { success: true, message: response.data.message };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return {
        success: false,
        message: "A class with this name has already been created.",
      };
    }

    console.error("Error creating section:", error.message);
    return {
      success: false,
      message: "A class with this name has already been created.",
    };
  }
};

export default createSectionApi;
