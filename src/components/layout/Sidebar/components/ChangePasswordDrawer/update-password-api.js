import { updateAdminPasswordEndpoint } from "@/config/adminEndpoints";
import { updateStudentPasswordEndpoint } from "@/config/studentEndpoints";
import { updateTeacherPasswordEndpoint } from "@/config/teacherEndpoints";
import axiosInstance from "@/utils/axios";

const updatePasswordApi = async (currentPassword, newPassword, userType) => {
  try {
    let endpoint;

    switch (userType) {
      case "student":
        endpoint = updateStudentPasswordEndpoint;
        break;
      case "teacher":
        endpoint = updateTeacherPasswordEndpoint;
        break;
      case "admin":
        endpoint = updateAdminPasswordEndpoint;
        break;
      default:
        throw new Error(`Invalid userType: ${userType}`);
    }

    const response = await axiosInstance.patch(`${endpoint}`, {
      currentPassword,
      newPassword,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default updatePasswordApi;
