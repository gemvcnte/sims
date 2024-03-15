import showSuccessNotification from "@/utils/ShowSuccessNotification";
import { archiveStudentEndpoint } from "./adminEndpoints";
import axiosInstance from "@/utils/axios";
import showErrorNotification from "@/utils/ShowErrorNotification";

const archiveStudentById = async (studentId, archiveRemarks) => {
  const archiveStudentUrl = archiveStudentEndpoint.replace(
    ":studentId",
    studentId,
  );

  try {
    const response = await axiosInstance.post(archiveStudentUrl, {
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
    console.error("Error archiving student:", error.message);
    return false;
  }
};

export { archiveStudentById };
