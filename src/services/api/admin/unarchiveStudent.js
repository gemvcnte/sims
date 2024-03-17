import showSuccessNotification from "@/utils/ShowSuccessNotification";
import axiosInstance from "@/utils/axios";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { unarchiveStudentEndpoint } from "@/config/adminEndpoints";

const unarchiveStudent = async (studentId) => {
  const archiveStudentUrl = unarchiveStudentEndpoint.replace(
    ":studentId",
    studentId,
  );

  try {
    const response = await axiosInstance.patch(archiveStudentUrl);

    if (response.status === 200) {
      showSuccessNotification(response.data.message); // Log the response message
      return true; // Archive successful
    } else {
      showErrorNotification(
        response.data.message || "Failed to unarchive student",
      );
    }
  } catch (error) {
    console.error("Error archiving student:", error.message);
    return false;
  }
};

export { unarchiveStudent };
