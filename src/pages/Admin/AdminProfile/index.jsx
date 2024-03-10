import Topbar from "@/components/layout/Topbar";
import React from "react";
import AdminProfileDisplayAndEditSection from "./components";

export default function AdminProfile() {
  return (
    <main className="w-full">
      <Topbar>ADMIN PROFILE</Topbar>

      <AdminProfileDisplayAndEditSection />
    </main>
  );
}
