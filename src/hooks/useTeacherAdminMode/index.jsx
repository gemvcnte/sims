import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherAdminModeContext = createContext();

export const useTeacherAdminMode = () => {
  const context = useContext(TeacherAdminModeContext);
  if (!context) {
    throw new Error(
      "useTeacherAdminMode must be used within a TeacherAdminModeProvider",
    );
  }
  return context;
};

export const TeacherAdminModeProvider = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsAdminMode((prevMode) => !prevMode);
    navigate("dashboard");
  };

  return (
    <TeacherAdminModeContext.Provider value={{ isAdminMode, toggleMode }}>
      {children}
    </TeacherAdminModeContext.Provider>
  );
};
