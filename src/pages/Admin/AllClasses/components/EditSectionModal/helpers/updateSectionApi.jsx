import { adminSectionEndpoint } from "@/config/adminEndpoints";
import axiosInstance from "@/utils/axios";

const updateSectionApi = async (sectionId, sectionDetails) => {
  try {
    const response = await axiosInstance.patch(
      `${adminSectionEndpoint}/${sectionId}`,
      sectionDetails,
    );

    if (response.status === 200) {
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

export default updateSectionApi;
