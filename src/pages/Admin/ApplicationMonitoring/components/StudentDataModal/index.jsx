import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  { value: "JR", label: "Jr" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
  { value: "NONE", label: "None" },
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
    <DialogContent className={"max-h-[80%] overflow-y-scroll lg:max-w-[425px]"}>
      <form onSubmit={handleSaveChanges}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Input Your Last Name"
              defaultValue={editedApplication.lastName}
              name="lastName"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Input Your First Name"
              defaultValue={editedApplication.firstName}
              name="firstName"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="middleName" className="text-right">
              Middle Name
            </Label>
            <Input
              id="middleName"
              type="text"
              placeholder="Input Your Middle Name"
              defaultValue={editedApplication.middleName}
              name="middleName"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="extensionName" className="text-right">
              Extension Name
            </Label>
            <select
              required
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="birthDate" className="text-right">
              BirthDate
            </Label>
            <InputField
              type="date"
              placeholder="Input Your Birthdate (MM/DD/YY)"
              value={editedApplication.birthDate}
              name="birthDate"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <select
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={editedApplication.gender}
              required
              name="gender"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentAddress" className="text-right">
              Current Address
            </Label>
            <InputField
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="E.g., 123 Purok St, Barangay, Municipality"
              value={editedApplication.currentAddress}
              name="currentAddress"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <InputField
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Input Your Email"
              value={editedApplication.emailAddress}
              name="emailAddress"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fatherName" className="text-right">
              Father's Name
            </Label>
            <InputField
              required
              type="text"
              placeholder="Firstname Middlename Lastname"
              value={editedApplication.fatherName}
              onChange={(e) => handleInputChange("fatherName", e.target.value)}
              name="fatherName"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motherName" className="text-right">
              Mother's Name
            </Label>
            <InputField
              required
              type="text"
              placeholder="Firstname Middlename Lastname"
              value={editedApplication.motherName}
              onChange={(e) => handleInputChange("motherName", e.target.value)}
              name="motherName"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="FatherContactNumber" className="text-right">
              Father's Tel. No.
            </Label>
            <InputField
              required
              type="number"
              placeholder="+639xxxxxxxxx"
              value={editedApplication.fatherContactNumber}
              onChange={(e) =>
                handleInputChange("fatherContactNumber", e.target.value)
              }
              name="fatherContactNumber"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motherContactNumber" className="text-right">
              Mother's Tel. No.
            </Label>
            <InputField
              required
              type="number"
              placeholder="+639xxxxxxxxx"
              value={editedApplication.motherContactNumber}
              onChange={(e) =>
                handleInputChange("motherContactNumber", e.target.value)
              }
              name="motherContactNumber"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="guardianName" className="text-right">
              Guardian's Name
            </Label>
            <InputField
              type="text"
              placeholder="Firstname Middlename Lastname"
              value={editedApplication.guardianName}
              onChange={(e) =>
                handleInputChange("guardianName", e.target.value)
              }
              name="guardianName"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="guardianContactNumber" className="text-right">
              Guardian's Tel. No.
            </Label>
            <InputField
              type="number"
              placeholder="+639xxxxxxxxx"
              value={editedApplication.guardianContactNumber}
              onChange={(e) =>
                handleInputChange("guardianContactNumber", e.target.value)
              }
              name="guardianContactNumber"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="guardianRelationship" className="text-right">
              Guardian Relationship
            </Label>
            <select
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="guardianRelationship"
              value={editedApplication.guardianRelationship}
              onChange={(e) =>
                handleInputChange("guardianRelationship", e.target.value)
              }
            >
              <option value="">Relationship with Guardian</option>
              <option value="Parent">Parent</option>
              <option value="Relative">Relative</option>
              <option value="Non-relative">Non-relative</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lrn" className="text-right">
              LRN
            </Label>
            <input
              type="number"
              placeholder="Input Your LRN"
              value={editedApplication.lrn}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => handleInputChange("lrn", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="schoolYear" className="text-right">
              School Year
            </Label>
            <select
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="schoolYear"
              value={editedApplication.schoolYear}
              onChange={(e) => handleInputChange("schoolYear", e.target.value)}
            >
              <option value="">Select School Year</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="semester" className="text-right">
              Semester
            </Label>
            <select
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="semester"
              value={editedApplication.semester}
              onChange={(e) => handleInputChange("semester", e.target.value)}
            >
              <option value="">Select Semester</option>
              <option value="first semester">1st Semester</option>
              <option value="second semester">2nd Semester</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="track" className="text-right">
              Track
            </Label>
            <select
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="track"
              value={editedApplication.track}
              onChange={(e) => handleInputChange("track", e.target.value)}
            >
              <option value="">Select Track</option>
              <option value="academic">Academic Track</option>
              <option value="tvl">TVL Track</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="strand" className="text-right">
              Strand
            </Label>

            <select
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
