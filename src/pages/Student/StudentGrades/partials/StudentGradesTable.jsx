import React, { useEffect, useState } from "react";
import { useClassDetails } from "../hooks/ClassDetailsContext";

export default function StudentGradesTable() {
  const classDetailsContext = useClassDetails();
  const { classDetails: fetchedClass, loading } = classDetailsContext;
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    if (fetchedClass && fetchedClass.length > 0) {
      const sortedClasses = [...fetchedClass].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setClassDetails(sortedClasses[0]);
    }
  }, [fetchedClass]);

  console.log(classDetails);

  return <div>grades table</div>;
}
