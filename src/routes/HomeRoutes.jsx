import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter/AdminRouter";
import LoginRoutes from "./LoginRoutes";
import StudentRouter from "./StudentRouter";
import TeacherRouter from "./TeacherRouter";
import { jwtDecode } from "jwt-decode";
import ForgotPassword from "@/components/forgot-password";
import VerifyResetCode from "@/components/verify-reset-code";

const HomeRoutes = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        const role = decodedToken.role;

        setUserRole(role);
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

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<VerifyResetCode />} />
      {!userRole && <Route path="*" element={<LoginRoutes />} />}
    </Routes>
  );
};

export default HomeRoutes;
