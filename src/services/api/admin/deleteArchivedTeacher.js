import { deleteArchivedTeacherEndpoint } from "@/config/adminEndpoints";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import axiosInstance from "@/utils/axios";
import showErrorNotification from "@/utils/ShowErrorNotification";

const deleteArchivedTeacher = async (teacherId) => {
  const deleteArchivedTeacherUrl = deleteArchivedTeacherEndpoint.replace(
    ":teacherId",
    teacherId,
  );

  try {
    const response = await axiosInstance.delete(deleteArchivedTeacherUrl);

    if (response.status === 200) {
      showSuccessNotification(response.data.message); // Log the response message
      return true; // Archive successful
    } else {
      showErrorNotification(
        response.data.message || "Failed to archive teacher",
      );
    }
  } catch (error) {
    showErrorNotification(error.response.data.message);
    return false;
  }
};

export { deleteArchivedTeacher };
