const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getStudentProfileEndpoint = `${baseUrl}/student/profile`;
export const updateStudentProfileEndpoint = `${baseUrl}/student/profile/update`;

export const getStudentAnnouncementsEndpoint = `${baseUrl}/student/get-announcements`;

export const getStudentAssignedClassEndpoint = `${baseUrl}/student/class/assigned-class`;
