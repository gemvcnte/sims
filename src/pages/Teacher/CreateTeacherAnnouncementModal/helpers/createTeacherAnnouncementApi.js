import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { createTeacherAnnouncementEndpoint } from "@/config/teacherEndpoints";
import axiosInstance from "@/utils/axios";

const createAnnouncementApi = async (announcementData) => {
  try {
    const response = await axiosInstance.post(
      createTeacherAnnouncementEndpoint,
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

export { createAnnouncementApi };
