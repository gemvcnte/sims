import { deleteArchivedAdminEndpoint } from "@/config/adminEndpoints";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import axiosInstance from "@/utils/axios";
import showErrorNotification from "@/utils/ShowErrorNotification";

const deleteArchivedAdmin = async (adminId) => {
  const deleteArchivedAdminUrl = deleteArchivedAdminEndpoint.replace(
    ":adminId",
    adminId,
  );

  try {
    const response = await axiosInstance.delete(deleteArchivedAdminUrl);

    if (response.status === 200) {
      showSuccessNotification(response.data.message); // Log the response message
      return true; // Archive successful
    } else {
      showErrorNotification(response.data.message || "Failed to archive admin");
    }
  } catch (error) {
    showErrorNotification(error.response.data.message);
    return false;
  }
};

export { deleteArchivedAdmin };
