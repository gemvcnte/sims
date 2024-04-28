import useCookie from "@/hooks/useCookie";

export default function getAuthHeaders() {
  const { getCookie } = useCookie();

  const authToken = getCookie("authToken");
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
}
