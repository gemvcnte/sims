import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import axiosInstance from "@/utils/axios";
import { updateAnnouncementEndpoint } from "@/config/adminEndpoints";

const updateAnnouncementApi = async (updatedAnnouncementData) => {
  try {
    showSuccessNotification(`Announcement successfully updated! 🎉`);

    const response = await axiosInstance.patch(
      updateAnnouncementEndpoint,
      updatedAnnouncementData,
    );

    if (response.status !== 200) {
      showErrorNotification(response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    showErrorNotification("An error occurred while updating the announcement.");
    throw error;
  }
};

export { updateAnnouncementApi };
