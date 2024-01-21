import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import axiosInstance from "@/utils/axios";
import { deleteAnnouncementEndpoint } from "@/config/adminEndpoints";

const deleteAnnouncementApi = async (announcementId) => {
  try {
    const response = await axiosInstance.delete(deleteAnnouncementEndpoint, {
      data: {
        announcementId: announcementId,
      },
    });

    response.status == 202
      ? showSuccessNotification(response.data.message)
      : showErrorNotification(response.data.message);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { deleteAnnouncementApi };
