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

// view all {role} - user management
export const getAllStudentsEndpoint = `${baseUrl}/admin/get-all-students`;
export const getALlTeachers = `${baseUrl}/admin/get-teachers`;
export const getAllAdmins = `${baseUrl}/admin/get-admins`;

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
export const updateAnnouncementEndpoint = `${baseUrl}/admin/announcement/update`;
export const deleteAnnouncementEndpoint = `${baseUrl}/admin/announcement/delete`;

// password
export const updateAdminPasswordEndpoint = `${baseUrl}/admin/update-password`;

// analytics
export const getAllAnalyticsEndpoint = `${baseUrl}/admin/analytics/all`;

// reset password
export const StudentsEndpoint = `${baseUrl}/admin/students`;
export const ResetStudentPasswordEndpoint = `${baseUrl}/admin/reset-student-password`;
export const teachersEndpoint = `${baseUrl}/admin/teachers`;
export const resetTeacherPasswordEndpoint = `${baseUrl}/admin/reset-teacher-password`;
export const adminsEndpoint = `${baseUrl}/admin/admins`;
export const resetAdminPasswordEndpoint = `${baseUrl}/admin/reset-admin-password`;

// global settings
export const globalSettingsEndpoint = `${baseUrl}/admin/global-settings`;

// monitoring page
export const pendingApplicationsEndpoint = `${baseUrl}/admin/get-pending`;
export const rejectedApplicationsEndpoint = `${baseUrl}/admin/get-rejected`;
export const approvedApplicationsEndpoint = `${baseUrl}/admin/get-approved`;
export const allApplicationsEndpoint = `${baseUrl}/admin/all-applications`;

// updating students in class
export const getStudentsInSpecificClassEndpoint = `${baseUrl}/admin/students-in-specific-class`;
export const getStudentsInSpecificClassAndNoClassEndpoint = `${baseUrl}/admin/students-in-class-and-no-class`;

// ARCHIVE FEATURE
export const archiveStudentEndpoint = `${baseUrl}/admin/students/:studentId/archive`;
export const getAllArchivedStudentsEndpoint = `${baseUrl}/admin/students/archived`;
