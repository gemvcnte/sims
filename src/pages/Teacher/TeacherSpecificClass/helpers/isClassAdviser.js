import useCookie from "@/hooks/useCookie";
import { jwtDecode } from "jwt-decode";

export const isClassAdviser = (classDetails) => {
  const { getCookie } = useCookie();

  const authToken = getCookie("authToken");

  if (authToken && classDetails) {
    const decodedToken = jwtDecode(authToken);
    const loggedInUsername = decodedToken.username;
    const adviserUsername = classDetails.adviser;
    return loggedInUsername === adviserUsername;
  }
  return false;
};
