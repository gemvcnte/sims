import React from "react";
import { useClassDetails } from "../contexts/ClassDetailsContext";

export default function ClassName() {
  // const { classDetails, loading } = useClassDetails();

  // if (loading) {
  //   return <span>Loading...</span>;
  // }

  // return <span className="uppercase">{classDetails[0].sectionName}</span>;

  return <span className="uppercase">SCHEDULE</span>;
}