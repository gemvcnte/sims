import { archiveAdminEndpoint } from "@/config/adminEndpoints";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import axiosInstance from "@/utils/axios";
import showErrorNotification from "@/utils/ShowErrorNotification";

const archiveAdmin = async (adminId, archiveRemarks) => {
  const archiveAdminUrl = archiveAdminEndpoint.replace(":adminId", adminId);

  try {
    const response = await axiosInstance.patch(archiveAdminUrl, {
      remarks: archiveRemarks,
    });

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

export { archiveAdmin };
