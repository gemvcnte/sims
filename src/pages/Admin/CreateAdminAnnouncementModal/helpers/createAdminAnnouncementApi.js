import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import axiosInstance from "@/utils/axios";
import { createAdminClassAnnouncementEndpoint } from "@/config/adminEndpoints";

const createAdminAnnouncementApi = async (announcementData) => {
  try {
    const response = await axiosInstance.post(
      createAdminClassAnnouncementEndpoint,
      announcementData,
    );

    response.status == 201
      ? showSuccessNotification(response.data.message)
      : showErrorNotification(response.data.message);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createAdminAnnouncementApi };
