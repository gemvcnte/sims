import React, { useState } from "react";
import { Icon } from "@iconify/react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  className,
}) => (
  <input
    className={`${className}`}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    name={name}
  />
);

const selectOptions = [
  { value: "", label: "Select Extension Name" },
  { value: "Jr", label: "Jr" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
  { value: "none", label: "None" },
];

export default function StudentDataModal({ application, onSave, onClose }) {
  const [editedApplication, setEditedApplication] = useState({
    ...application,
    // Convert values to lowercase
    track: application.track ? application.track.toLowerCase() : "",
    strand: application.strand ? application.strand.toLowerCase() : "",
    semester: application.semester ? application.semester.toLowerCase() : "",
  });

  const handleInputChange = (field, value) => {
    console.log(value); // Add this line to log the value
    if (field === "birthDate") {
      setEditedApplication({
        ...editedApplication,
        [field]: value,
      });
    } else {
      setEditedApplication({
        ...editedApplication,
        [field]: value,
      });
    }
  };

  const handleSaveChanges = () => {
    onSave && onSave(editedApplication);
    onClose && onClose();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center justify-center bg-white-500 bg-opacity-75">
      <div>
        <div>
          <label>Last Name</label>
          <InputField
            type="text"
            placeholder="Input Your Last Name"
            value={editedApplication.lastName}
            name="lastName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className={`${
              editedApplication.lastName && "!border-blue-400 text-blue-400"
            }`}
          />
        </div>

        <div>
          <label>First Name</label>
          <InputField
            type="text"
            placeholder="Input Your First Name"
            value={editedApplication.firstName}
            name="firstName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className={`${
              editedApplication.firstName && "!border-blue-400 text-blue-400"
            }`}
          />
        </div>

        <div>
          <label>Middle Name</label>
          <InputField
            type="text"
            placeholder="Input Your Middle Name"
            value={editedApplication.middleName}
            name="middleName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className={`${
              editedApplication.middleName && "!border-blue-400 text-blue-400"
            }`}
          />
        </div>

        <div>
          <label>Extension Name </label>
          <select
            required
            className={`${
              editedApplication.extensionName &&
              "!border-blue-400 bg-blue-400 text-white-400"
            }`}
            value={editedApplication.extensionName}
            name="extensionName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          >
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div>
          <label>Birthdate</label>
          <InputField
            type="date"
            placeholder="Input Your Birthdate (MM/DD/YY)"
            value={editedApplication.birthDate}
            name="birthDate"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className={`${
              editedApplication.birthDate && "!border-blue-400 text-blue-400"
            }`}
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            className={`${
              editedApplication.gender &&
              "!border-blue-400 bg-blue-400 text-white-400"
            }`}
            value={editedApplication.gender}
            required
            name="gender"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Current Address</label>
          <InputField
            className={`${
              editedApplication.currentAddress &&
              "!border-blue-400 text-blue-400"
            }`}
            type="text"
            placeholder="E.g., 123 Purok St, Barangay, Municipality"
            value={editedApplication.currentAddress}
            name="currentAddress"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <InputField
            className={`${
              editedApplication.emailAddress && "!border-blue-400 text-blue-400"
            }`}
            type="email"
            placeholder="Input Your Email"
            value={editedApplication.emailAddress}
            name="emailAddress"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>
      </div>

      {/* Add similar blocks for other fields */}
      {/* ... */}

      <div>
        <div>
          <div>
            <label>Father's Name (*)</label>
            <InputField
              required
              type="text"
              placeholder="Firstname Middlename Lastname"
              value={editedApplication.fatherName}
              onChange={(e) => handleInputChange("fatherName", e.target.value)}
              name="fatherName"
              o
              className={`${
                editedApplication.fatherName && "!border-blue-400 text-blue-400"
              }`}
            />
          </div>
          <div>
            <label>Mother's Name (*)</label>
            <InputField
              required
              type="text"
              placeholder="Firstname Middlename Lastname"
              value={editedApplication.motherName}
              onChange={(e) => handleInputChange("motherName", e.target.value)}
              name="motherName"
              className={`${
                editedApplication.motherName && "!border-blue-400 text-blue-400"
              }`}
            />
          </div>
        </div>

        <div>
          <div>
            <label>Father's Co. Number (*)</label>
            <InputField
              required
              type="number"
              placeholder="+639xxxxxxxxx"
              value={editedApplication.fatherContactNumber}
              onChange={(e) =>
                handleInputChange("fatherContactNumber", e.target.value)
              }
              name="fatherContactNumber"
              className={`${
                editedApplication.fatherContactNumber &&
                "!border-blue-400 text-blue-400"
              }`}
            />
          </div>
          <div>
            <label>Mother's Co. Number (*)</label>
            <InputField
              required
              type="number"
              placeholder="+639xxxxxxxxx"
              value={editedApplication.motherContactNumber}
              onChange={(e) =>
                handleInputChange("motherContactNumber", e.target.value)
              }
              name="motherContactNumber"
              className={`${
                editedApplication.motherContactNumber &&
                "!border-blue-400 text-blue-400"
              }`}
            />
          </div>
        </div>
      </div>

      <div>
        <div>
          <label>Guardian's Name</label>
          <InputField
            type="text"
            placeholder="Firstname Middlename Lastname"
            value={editedApplication.guardianName}
            onChange={(e) => handleInputChange("guardianName", e.target.value)}
            name="guardianName"
          />
        </div>

        <div>
          <label>Guardian's Co. Number</label>
          <InputField
            type="number"
            placeholder="+639xxxxxxxxx"
            value={editedApplication.guardianContactNumber}
            onChange={(e) =>
              handleInputChange("guardianContactNumber", e.target.value)
            }
            name="guardianContactNumber"
          />
        </div>
      </div>

      {/* STEP 3 */}
      <div>
        <div>
          <div>
            <label>LRN (Learner Reference Number)</label>
            <input
              type="number"
              placeholder="Input Your LRN"
              value={editedApplication.lrn}
              className={` ${
                editedApplication.lrn && "!border-blue-400 text-blue-400"
              }`}
              onChange={(e) => handleInputChange("lrn", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="schoolYear">School Year</label>
            <select
              className={` ${
                editedApplication.schoolYear &&
                "!border-blue-400 bg-blue-400 text-white-400"
              }`}
              id="schoolYear"
              value={editedApplication.schoolYear}
              onChange={(e) => handleInputChange("schoolYear", e.target.value)}
            >
              <option value="">Select School Year</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>

          <div>
            <label htmlFor="semester">Semester</label>
            <select
              className={`${
                editedApplication.semester &&
                "!border-blue-400 bg-blue-400 text-white-400"
              }`}
              id="semester"
              value={editedApplication.semester}
              onChange={(e) => handleInputChange("semester", e.target.value)}
            >
              <option value="">Select Semester</option>
              <option value="first semester">1st Semester</option>
              <option value="second semester">2nd Semester</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label>Track</label>
            <select
              className={` ${
                editedApplication.track &&
                "!border-blue-400 bg-blue-400 text-white-400"
              }`}
              id="track"
              value={editedApplication.track}
              onChange={(e) => handleInputChange("track", e.target.value)}
            >
              <option value="">Select Track</option>
              <option value="academic">Academic Track</option>
              <option value="tvl">TVL Track</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="strand">Strand</label>
            <select
              className={` ${
                editedApplication.strand &&
                "!border-blue-400 bg-blue-400 text-white-400"
              }`}
              id="strand"
              value={editedApplication.strand}
              onChange={(e) => handleInputChange("strand", e.target.value)}
            >
              <option value="">Select Strand</option>
              <option value="gas">GAS (Academic)</option>
              <option value="humss">HUMSS (Academic)</option>
              <option value="stem">STEM (Academic)</option>
              <option value="ict">ICT (TVL)</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <select
          name="guardianRelationship"
          value={editedApplication.guardianRelationship}
          onChange={(e) =>
            handleInputChange("guardianRelationship", e.target.value)
          }
        >
          <option value="">Relationship</option>
          <option value="Parent">Parent</option>
          <option value="Relative">Relative</option>
          <option value="Non-relative">Non-relative</option>
        </select>
      </div>

      <div>
        <button
          type="button"
          onClick={handleSaveChanges}
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
    </div>
  );
}
