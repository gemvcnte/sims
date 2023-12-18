import axios from "axios";
import { createAdminAnnouncementEndpoint } from "@/config/adminEndpoints";

const createAnnouncementApi = async (announcementData) => {
  try {
    const response = await axios.post(
      createAdminAnnouncementEndpoint,
      announcementData,
      getAuthHeaders(),
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createAnnouncementApi };
