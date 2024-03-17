import showSuccessNotification from "@/utils/ShowSuccessNotification";
import axiosInstance from "@/utils/axios";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { unarchiveAdminEndpoint } from "@/config/adminEndpoints";

const unarchiveAdmin = async (adminId) => {
  const archiveAdminUrl = unarchiveAdminEndpoint.replace(":adminId", adminId);

  try {
    const response = await axiosInstance.patch(archiveAdminUrl);

    if (response.status === 200) {
      showSuccessNotification(response.data.message); // Log the response message
      return true; // Archive successful
    } else {
      showErrorNotification(
        response.data.message || "Failed to unarchive admin",
      );
    }
  } catch (error) {
    console.error("Error archiving admin:", error.message);
    return false;
  }
};

export { unarchiveAdmin };
