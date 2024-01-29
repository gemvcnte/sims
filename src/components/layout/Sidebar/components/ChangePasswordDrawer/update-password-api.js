import { updateStudentPasswordEndpoint } from "@/config/studentEndpoints";
import showErrorNotification from "@/utils/ShowErrorNotification";
import axiosInstance from "@/utils/axios";

const updatePasswordApi = async (currentPassword, newPassword) => {
  try {
    const response = await axiosInstance.patch(
      `${updateStudentPasswordEndpoint}`,
      {
        currentPassword,
        newPassword,
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export default updatePasswordApi;
