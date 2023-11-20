import React from "react";

export default function StudentDataModal({ application }) {
  return (
    <div className="absolute">
      {application && (
        <div>
          <h2>{`${application.firstName} ${application.lastName}`}</h2>
          {/* Display other application data as needed */}
        </div>
      )}
    </div>
  );
}
