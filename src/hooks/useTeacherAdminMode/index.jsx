import React, { createContext, useContext, useState } from "react";

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
  const [isAdminMode, setIsAdminMode] = useState(true);

  const toggleMode = () => {
    setIsAdminMode((prevMode) => !prevMode);
    console.log("Admin mode: ", isAdminMode);
  };

  return (
    <TeacherAdminModeContext.Provider value={{ isAdminMode, toggleMode }}>
      {children}
    </TeacherAdminModeContext.Provider>
  );
};