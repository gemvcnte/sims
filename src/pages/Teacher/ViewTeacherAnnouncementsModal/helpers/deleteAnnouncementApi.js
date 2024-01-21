import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import axiosInstance from "@/utils/axios";
import { deleteAnnouncementEndpoint } from "@/config/adminEndpoints";

const deleteAnnouncementApi = async (announcementId) => {
  try {
    showSuccessNotification(`Successfully deleted, Please refresh the page...`);

    const response = await axiosInstance.delete(deleteAnnouncementEndpoint, {
      data: {
        announcementId: announcementId,
      },
    });

    if (response.status !== 202) {
      showErrorNotification(response.data.message);
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { deleteAnnouncementApi };
