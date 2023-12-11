import axios from "axios";
import { updateApplicationEndpoint } from "@/config/adminEndpoints";
import getAuthHeaders from "@/utils/getAuthHeaders";

export const sendUpdateRequest = async (studentApplicationId, updatedData) => {
  try {
    const response = await axios.patch(
      updateApplicationEndpoint,
      {
        studentApplicationId,
        updatedData,
      },
      getAuthHeaders(),
    );

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
