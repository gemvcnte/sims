const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// profile
export const getTeacherProfileEndpoint = `${baseUrl}/teacher/profile`;
export const updateTeacherProfileEndpoint = `${baseUrl}/teacher/profile/update`;

// class
export const getTeacherAssignedClassesEndpoint = `${baseUrl}/teacher/class/getAssignedClasses`;
export const addSubjectEndpoint = `${baseUrl}/teacher/class/add-subject`;
export const updateSubjectEndpoint = `${baseUrl}/teacher/class/update-subject/`;
export const deleteSubjectEndpoint = `${baseUrl}/teacher/class/delete-subject`;
export const updateStudentsInClassEndpoint = `${baseUrl}/teacher/class/update-students`;
export const getAllTeachersEndpoint = `${baseUrl}/teacher/get-all-teachers`;
export const getAllStudentsEndpoint = `${baseUrl}/teacher/getStudents`;
