import Topbar from "@/components/layout/Topbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClassNav from "./partials/ClassNav";
import { ClassNavProvider, useClassNav } from "./contexts/ClassNavContext";
import StudentsTable from "./partials/StudentsTable";
import TableController from "./partials/TableController";
import Header from "./partials/Header";
import { ClassDetailsProvider } from "./contexts/ClassDetailsContext";
import ClassName from "./partials/ClassName";

export default function TeacherSpecificClass() {
  return (
    <ClassDetailsProvider>
      <main className="w-full">
        <Topbar>
          <ClassName />
        </Topbar>

        <ClassNavProvider>
          <Header />
          <TableController />
        </ClassNavProvider>
      </main>
    </ClassDetailsProvider>
  );
}
