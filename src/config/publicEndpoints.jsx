const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getAnnouncementsEndpoint = `${baseUrl}/announcement`;
