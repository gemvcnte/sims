const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// profile
export const getAdminProfileEndpoint = `${baseUrl}/admin/profile`;
export const updateAdminProfileEndpoint = `${baseUrl}/admin/profile/update`;

// registration
export const registrationEndpoint = `${baseUrl}/apply`;

// application monitoring
export const getPendingApplicationsEndpoint = `${baseUrl}/admin/getPending`;
export const enrollApplicationEndpoint = `${baseUrl}/admin/enrollStudent`;
export const rejectApplicationEndpoint = `${baseUrl}/admin/rejectApplication`;
export const updateApplicationEndpoint = `${baseUrl}/admin/updateApplication`;

// creating accounts
export const createTeacherEndpoint = `${baseUrl}/admin/createTeacher`;
export const createAdminEndpoint = `${baseUrl}/admin/create`;

// class
export const createClassEndpoint = `${baseUrl}/admin/class/create`;

// announcements
export const createAdminAnnouncementEndpoint = `${baseUrl}/admin/announcement/create-school-announcement`;
