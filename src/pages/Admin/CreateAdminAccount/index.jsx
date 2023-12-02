import Topbar from "@/components/layout/Topbar";
import React from "react";
import { CreateAdminAccountForm } from "./components";

export default function CreateAdminAccount() {
  return (
    <main className="w-full">
      <Topbar>CREATE ADMIN ACCOUNT</Topbar>

      <CreateAdminAccountForm />
    </main>
  );
}
