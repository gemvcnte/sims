import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter/AdminRouter";
import LoginRoutes from "./LoginRoutes";
import StudentRouter from "./StudentRouter";
import TeacherRouter from "./TeacherRouter";
import { jwtDecode } from "jwt-decode";

const HomeRoutes = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        console.log(decodedToken);

        const role = decodedToken.role;

        setUserRole(role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  console.log(userRole);

  return (
    <Routes>
      {userRole == "Student" && <Route path="*" element={<StudentRouter />} />}
      {userRole == "Teacher" && <Route path="*" element={<TeacherRouter />} />}
      {userRole == "Admin" && <Route path="*" element={<AdminRouter />} />}
      {!userRole && <Route path="*" element={<LoginRoutes />} />}
    </Routes>
  );
};

export default HomeRoutes;
