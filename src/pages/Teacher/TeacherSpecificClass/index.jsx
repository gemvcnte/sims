import Topbar from "@/components/layout/Topbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClassNav from "./partials/ClassNav";
import { ClassNavProvider, useClassNav } from "./contexts/ClassNavContext";
import StudentsTable from "./partials/StudentsTable";
import TableController from "./partials/TableController";
import useClassDetails from "./hooks/useClassDetails";
import Header from "./partials/Header";

export default function TeacherSpecificClass() {
  const { id } = useParams();
  const { classDetails, loading } = useClassDetails(id);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(classDetails);

  return (
    <main className="w-full">
      <Topbar>
        <span className="uppercase">{classDetails.sectionName}</span>
      </Topbar>

      <ClassNavProvider>
        <Header />
        <TableController classDetails={classDetails} />
      </ClassNavProvider>
    </main>
  );
}
