# Student Information Management System (S.I.M.S) API Documentation

## Student Application Endpoints:

### Apply for Admission
- **Endpoint:** `/apply`
- **Method:** POST
- **Description:** Submit an application for admission.

## Student Endpoints:

### Student Login
- **Endpoint:** `/student/login`
- **Method:** POST
- **Description:** Authenticate and log in as a student.

## Teacher Endpoints:

### Teacher Login
- **Endpoint:** `/teacher/login`
- **Method:** POST
- **Description:** Authenticate and log in as a teacher.

## Admin Endpoints: 

### Admin Operations:
- **Endpoint:** `/admin/login`
- **Method:** POST
- **Description:** Authenticate and log in as an admin.

- **Create Admin:**
  - **Endpoint:** `/admin/create`
  - **Method:** POST
  - **Description:** Create a new admin account.
  
- **Update Admin:**
  - **Endpoint:** `/admin/update`
  - **Method:** PATCH
  - **Description:** Update admin information.
  
- **Delete Admin:**
  - **Endpoint:** `/admin/delete`
  - **Method:** DELETE
  - **Description:** Delete an admin account.

- **Create Teacher:**
  - **Endpoint:** `/admin/createTeacher`
  - **Method:** POST
  - **Description:** Create a new teacher account.
  
- **Update Teacher:**
  - **Endpoint:** `/admin/updateTeacher`
  - **Method:** PATCH
  - **Description:** Update teacher information.
  
- **Get All Teachers:**
  - **Endpoint:** `/admin/getAllTeachers`
  - **Method:** GET
  - **Description:** Retrieve a list of all teachers.
  
- **Delete Teacher:**
  - **Endpoint:** `/admin/deleteTeacher`
  - **Method:** DELETE
  - **Description:** Delete a teacher account.

- **Get All Students:**
  - **Endpoint:** `/admin/getAllStudents`
  - **Method:** GET
  - **Description:** Retrieve a list of all students.

- **Get Pending Applications:**
  - **Endpoint:** `/admin/getPending`
  - **Method:** GET
  - **Description:** Retrieve a list of pending student applications.

- **Enroll Student:**
  - **Endpoint:** `/admin/enrollStudent/:id`
  - **Method:** POST
  - **Description:** Accept a student application and enroll the student.

