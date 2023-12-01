import Topbar from "@/components/layout/Topbar";
import React from "react";
import { CreateTeacherAccountForm } from "./components";

export default function CreateTeacherAccount() {
  return (
    <main className="w-full">
      <Topbar>CREATE TEACHER ACCOUNT</Topbar>

      <CreateTeacherAccountForm />
    </main>
  );
}
