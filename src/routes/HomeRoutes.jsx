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
        const role = decodedToken.role;

        setUserRole(role);

        console.log(userRole);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <Routes>
      {userRole == "student" && <Route path="*" element={<StudentRouter />} />}
      {userRole == "teacher" && <Route path="*" element={<TeacherRouter />} />}
      {userRole == "admin" && <Route path="*" element={<AdminRouter />} />}
      {!userRole && <Route path="*" element={<LoginRoutes />} />}
    </Routes>
  );
};

export default HomeRoutes;
