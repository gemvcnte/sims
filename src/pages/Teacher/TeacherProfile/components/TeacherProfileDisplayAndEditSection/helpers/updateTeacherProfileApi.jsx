import axios from "axios";
import { updateTeacherProfileEndpoint } from "@/config/teacherEndpoints";
import useCookie from "@/hooks/useCookie";

export const updateTeacherProfileApi = async (updatedProfileData) => {
  const { getCookie } = useCookie();

  const authToken = getCookie("authToken");

  try {
    const response = await axios.patch(
      updateTeacherProfileEndpoint,
      updatedProfileData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    const updatedData = response.data.teacherData;

    updateLocalProfileData(updatedData);

    return response;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const updateLocalProfileData = (updatedProfileData) => {
  localStorage.setItem("teacherProfile", JSON.stringify(updatedProfileData));
};
