import axios from "axios";
import { createAdminAnnouncementEndpoint } from "@/config/adminEndpoints";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import getAuthHeaders from "@/utils/getAuthHeaders";
import showErrorNotification from "@/utils/ShowErrorNotification";

const createAnnouncementApi = async (announcementData) => {
  try {
    const response = await axios.post(
      createAdminAnnouncementEndpoint,
      announcementData,
      getAuthHeaders(),
    );

    response.status == 201
      ? showSuccessNotification(response.data.message)
      : showErrorNotification(response.data.message);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createAnnouncementApi };
