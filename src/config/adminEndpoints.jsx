const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// profile
export const getAdminProfileEndpoint = `${baseUrl}/admin/profile`;
export const updateAdminProfileEndpoint = `${baseUrl}/admin/profile/update`;

// registration
export const registrationEndpoint = `${baseUrl}/apply`;

// application monitoring
export const getPendingApplicationsEndpoint = `${baseUrl}/admin/get-pending`;
export const enrollApplicationEndpoint = `${baseUrl}/admin/enroll-student`;
export const rejectApplicationEndpoint = `${baseUrl}/admin/reject-application`;
export const updateApplicationEndpoint = `${baseUrl}/admin/update-application`;

// students
export const getAllStudentsEndpoint = `${baseUrl}/admin/get-all-students`;

// creating accounts
export const createTeacherEndpoint = `${baseUrl}/admin/create-teacher`;
export const createAdminEndpoint = `${baseUrl}/admin/create`;

// class
export const createClassEndpoint = `${baseUrl}/admin/class/create`;
export const getClassesEndpoint = `${baseUrl}/admin/class/getAll`;

// teachers
export const getAllTeachersEndpoint = `${baseUrl}/admin/get-all-teachers`;

// announcements
export const createAdminAnnouncementEndpoint = `${baseUrl}/admin/announcement/create-school-announcement`;
export const createAdminClassAnnouncementEndpoint = `${baseUrl}/admin/announcement/create-class-announcement`;
