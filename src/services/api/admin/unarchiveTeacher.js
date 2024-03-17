import showSuccessNotification from "@/utils/ShowSuccessNotification";
import axiosInstance from "@/utils/axios";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { unarchiveTeacherEndpoint } from "@/config/adminEndpoints";

const unarchiveTeacher = async (teacherId) => {
  const archiveTeacherUrl = unarchiveTeacherEndpoint.replace(
    ":teacherId",
    teacherId,
  );

  try {
    const response = await axiosInstance.patch(archiveTeacherUrl);

    if (response.status === 200) {
      showSuccessNotification(response.data.message); // Log the response message
      return true; // Archive successful
    } else {
      showErrorNotification(
        response.data.message || "Failed to unarchive teacher",
      );
    }
  } catch (error) {
    console.error("Error archiving teacher:", error.message);
    return false;
  }
};

export { unarchiveTeacher };
