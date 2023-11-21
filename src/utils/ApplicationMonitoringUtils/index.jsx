import axios from "axios";
import config from "@src/config";

const baseUrl = config.development.baseUrl;

export const sendUpdateRequest = async (studentApplicationId, updatedData) => {
  try {
    const response = await axios.post(`${baseUrl}/admin/updateApplication`, {
      studentApplicationId,
      updatedData,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateLocalApplicationState = (
  studentApplicationId,
  updatedApplication,
  setPendingApplications,
  setSelectedApplication,
) => {
  setPendingApplications((previousApplications) => {
    const updatedApplications = previousApplications.map((application) =>
      application._id === studentApplicationId
        ? updatedApplication
        : application,
    );
    return updatedApplications;
  });

  setSelectedApplication(null);
};

export const handleUpdateError = (error) => {
  console.error("Error updating application:", error.message);
};
