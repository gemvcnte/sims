import React, { createContext, useContext, useState } from "react";

const ClassNavContext = createContext();

export const ClassNavProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState("students");

  const setTab = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <ClassNavContext.Provider value={{ selectedTab, setTab }}>
      {children}
    </ClassNavContext.Provider>
  );
};

export const useClassNav = () => {
  const context = useContext(ClassNavContext);
  if (!context) {
    throw new Error("useClassNav must be used within a ClassNavProvider");
  }
  return context;
};
