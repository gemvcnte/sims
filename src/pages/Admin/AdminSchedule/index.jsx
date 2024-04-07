import Topbar from "@/components/layout/Topbar";
import React from "react";
import { useAdminSchedule } from "./useAdminSchedule";

export default function AdminSchedule() {
  const { schedule } = useAdminSchedule();

  console.log(schedule);

  return <p>schedule table here</p>;
}
