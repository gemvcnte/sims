import { archiveTeacherEndpoint } from "@/config/adminEndpoints";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import axiosInstance from "@/utils/axios";
import showErrorNotification from "@/utils/ShowErrorNotification";

const archiveTeacher = async (teacherId, archiveRemarks) => {
  const archiveTeacherUrl = archiveTeacherEndpoint.replace(
    ":teacherId",
    teacherId,
  );

  try {
    const response = await axiosInstance.patch(archiveTeacherUrl, {
      remarks: archiveRemarks,
    });

    if (response.status === 200) {
      showSuccessNotification(response.data.message); // Log the response message
      return true; // Archive successful
    } else {
      showErrorNotification(
        response.data.message || "Failed to archive student",
      );
    }
  } catch (error) {
    showErrorNotification(error.response.data.message);
    return false;
  }
};

export { archiveTeacher };
