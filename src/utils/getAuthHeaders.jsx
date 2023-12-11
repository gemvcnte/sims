export default function getAuthHeaders() {
  const authToken = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
}
