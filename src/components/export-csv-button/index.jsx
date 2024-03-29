import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export default function ExportCsvButton({ data, headers, filename }) {
  if (!data || !headers || !filename) {
    return (
      <Button
        // className="border-none bg-green-400"
        variant="secondary"
        type="button"
        disabled
      >
        <Download className="mr-2 h-4 w-4" /> Export{" "}
        <span className="hidden sm:ml-[1ch] sm:inline-block"> CSV</span>
      </Button>
    );
  }

  if (data.length === 0) {
    return (
      <Button
        // className="border-none bg-green-400"
        variant="secondary"
        type="button"
        disabled
      >
        <Download className="mr-2 h-4 w-4" /> No Data
        <span className="hidden sm:ml-[1ch] sm:inline-block"> Available</span>
      </Button>
    );
  }

  return (
    <CSVLink data={data} headers={headers} filename={filename}>
      <Button
        // className="border-none bg-green-400"
        variant="secondary"
        type="button"
      >
        <Download className="mr-2 h-4 w-4" /> Export{" "}
        <span className="hidden sm:ml-[1ch] sm:inline-block"> CSV</span>
      </Button>
    </CSVLink>
  );
}
