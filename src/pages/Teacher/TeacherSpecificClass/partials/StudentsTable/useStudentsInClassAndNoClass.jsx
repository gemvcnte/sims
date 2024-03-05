import { createContext, useContext, useState } from "react";
import axios from "axios";

const StudentsInClassAndNoClassContext = createContext();

export const useStudentsInClassAndNoClass = () => {
  const context = useContext(StudentsInClassAndNoClassContext);
  if (!context) {
    throw new Error(
      "useStudentsInClassAndNoClass must be used within a StudentsInClassAndNoClassProvider",
    );
  }
  return context;
};

export const StudentsInClassAndNoClassProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudentsInClassAndNoClass = async (sectionId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/admin/students-in-class-and-no-class`,
        {
          sectionId,
        },
      );
      setStudents(response.data.students);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentsInClassAndNoClassContext.Provider
      value={{
        students,
        loading,
        error,
        fetchStudentsInClassAndNoClass,
      }}
    >
      {children}
    </StudentsInClassAndNoClassContext.Provider>
  );
};
