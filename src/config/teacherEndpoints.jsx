const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// profile
export const getTeacherProfileEndpoint = `${baseUrl}/teacher/profile`;
export const updateTeacherProfileEndpoint = `${baseUrl}/teacher/profile/update`;

// class
export const getTeacherAssignedClassesEndpoint = `${baseUrl}/teacher/class/getAssignedClasses`;
