import Topbar from "@/components/layout/Topbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClassNav from "./partials/ClassNav";
import { ClassNavProvider, useClassNav } from "./contexts/ClassNavContext";
import StudentsTable from "./partials/StudentsTable";
import TableController from "./partials/TableController";

export default function TeacherSpecificClass() {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/teacher/class/get-specific-class/${id}`,
        );
        setClassDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!classDetails) {
    return <p>Loading...</p>;
  }

  console.log(classDetails);

  return (
    <main className="w-full">
      <Topbar>
        <span className="uppercase">{classDetails.sectionName}</span>
      </Topbar>

      <ClassNavProvider>
        <ClassNav />
        <TableController classDetails={classDetails} />
      </ClassNavProvider>
    </main>
  );
}
