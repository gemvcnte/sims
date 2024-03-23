import {
  deleteArchivedTeacherEndpoint,
  deleteSectionEndpoint,
} from "@/config/adminEndpoints";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import axiosInstance from "@/utils/axios";
import showErrorNotification from "@/utils/ShowErrorNotification";

const deleteSection = async (sectionId) => {
  const deleteSectionUrl = deleteSectionEndpoint.replace(
    ":sectionId",
    sectionId,
  );

  try {
    const response = await axiosInstance.delete(deleteSectionUrl);

    if (response.status === 202) {
      showSuccessNotification(response.data.message); // Log the response message
      return true; // Archive successful
    } else {
      showErrorNotification(
        response.data.message || "Failed to archive teacher",
      );
    }
  } catch (error) {
    showErrorNotification(error.response.data.message);
    return false;
  }
};

export { deleteSection };
