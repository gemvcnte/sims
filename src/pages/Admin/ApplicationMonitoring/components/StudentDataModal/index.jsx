import React, { useState } from "react";

export default function StudentDataModal({ application, onSave, onClose }) {
  const [editedApplication, setEditedApplication] = useState({
    ...application,
  });

  const handleInputChange = (field, value) => {
    setEditedApplication({
      ...editedApplication,
      [field]: value,
    });
  };

  const handleSave = () => {
    // Perform save action and pass the edited application to the parent component
    onSave && onSave(editedApplication);
    // Close the modal
    onClose && onClose();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
      <div className="bg-white w-96 rounded-md p-4">
        <h2 className="mb-4 text-xl font-bold">Edit Student Information</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={editedApplication.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </div>
          {/* Repeat similar blocks for other fields */}
          {/* ... */}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="text-white rounded-md bg-blue-500 px-4 py-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-white ml-2 rounded-md bg-gray-400 px-4 py-2"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
