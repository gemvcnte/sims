import axios from "axios";

const createSectionApi = async (sectionDetails) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/admin/class/create",
      sectionDetails,
    );

    if (response.status === 201) {
      return { success: true, message: response.data.message };
    } else {
      return {
        success: false,
        message: `Failed to create section. Status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error creating section:", error);
    return {
      success: false,
      message: "Error creating section. Please try again.",
    };
  }
};

export default createSectionApi;
