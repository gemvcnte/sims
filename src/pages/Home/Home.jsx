import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const fetchUserRole = async () => {
  try {
    const storedUserRole = await localStorage.getItem("userRole");
    return storedUserRole;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};

export default function Home() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserRole = await fetchUserRole();
        if (!storedUserRole) {
          setUserRole("none");
        } else {
          setUserRole(storedUserRole);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserData();
  }, []);

  return <Routes></Routes>;
}
