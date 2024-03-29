import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export default function ExportCsvButton({ csvData, headers, filename }) {
  return (
    // <CSVLink data={csvData} headers={headers} filename={filename}>
    <Button
      className="border-none bg-green-400"
      variant="outline"
      type="button"
    >
      <Download className="mr-2 h-4 w-4" /> Export{" "}
      <span className="hidden sm:ml-[1ch] sm:inline-block"> CSV</span>
    </Button>
    // </CSVLink>
  );
}
