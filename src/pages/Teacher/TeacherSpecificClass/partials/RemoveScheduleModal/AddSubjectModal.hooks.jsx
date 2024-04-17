import React, { createContext, useState, useContext } from "react";

// Create a context for the modal
const ModalContext = createContext();

// Custom hook to handle modal state
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModal must be used within a RemoveScheduleModalProvider",
    );
  }
  return context;
};

// RemoveScheduleModalProvider component to wrap around your application
export const RemoveScheduleModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, setIsModalOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};
