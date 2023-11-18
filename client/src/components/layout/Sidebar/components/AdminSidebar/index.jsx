import React from "react";
import SidebarContainer from "../SidebarContainer";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
  const isOnRegistrationPage = location.pathname === "/registration";

  return (
    !isOnRegistrationPage && (
      <SidebarContainer>
        <Link to="dashboard">admin dashboard</Link>
        <Link to="student-application-monitoring">monitoring</Link>
        <Link to="registration" target="_blank">
          registration
        </Link>
      </SidebarContainer>
    )
  );
}
