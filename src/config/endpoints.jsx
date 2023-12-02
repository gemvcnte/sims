// endpoints.js
const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const studentProfileEndpoint = `${baseUrl}/student/profile`;
export const updateProfileEndpoint = `${baseUrl}/student/profile/update`;
