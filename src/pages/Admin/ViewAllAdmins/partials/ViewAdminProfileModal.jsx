import React, { useState } from "react";
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
import { ArchiveAccountConfirmationAlertDialog } from "@/components/achive-account-confirmation-alert-dialog";

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
    disabled
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

export default function ViewAdminProfileModal({
  application,
  onSave,
  onClose,
}) {
  const handleSaveChanges = () => {
    onSave && onSave(application);
    onClose && onClose();
  };

  return (
    <DialogContent className={"max-h-[80%] overflow-y-scroll lg:max-w-[720px]"}>
      <form onSubmit={handleSaveChanges}>
        {/* <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to student's profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader> */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              disabled
              id="lastName"
              type="text"
              defaultValue={application.lastName}
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
              disabled
              id="firstName"
              type="text"
              defaultValue={application.firstName}
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
              disabled
              id="middleName"
              type="text"
              defaultValue={application.middleName}
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
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={application.extensionName}
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
              value={application.birthDate}
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
              value={application.gender}
              disabled
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
              value={application.currentAddress}
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
              value={application.emailAddress}
              name="emailAddress"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="FatherContactNumber" className="text-right">
              Teaching Year/s{" "}
            </Label>
            <InputField
              type="number"
              value={application.numOfYearsTeaching}
              onChange={(e) =>
                handleInputChange("fatherContactNumber", e.target.value)
              }
              name="fatherContactNumber"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="FatherContactNumber" className="text-right">
              Designation
            </Label>
            <InputField
              type="number"
              value={application.designation}
              onChange={(e) =>
                handleInputChange("fatherContactNumber", e.target.value)
              }
              name="fatherContactNumber"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="FatherContactNumber"
              className="break-words text-right"
            >
              Specialization
            </Label>
            <InputField
              type="number"
              value={application.specialization}
              onChange={(e) =>
                handleInputChange("fatherContactNumber", e.target.value)
              }
              name="fatherContactNumber"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motherName" className="text-right">
              Highest Educational Attainment
            </Label>
            <InputField
              type="text"
              value={application.highestEducationalAttainment}
              onChange={(e) => handleInputChange("motherName", e.target.value)}
              name="motherName"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fatherName" className="text-right">
              TIN
            </Label>
            <InputField
              type="text"
              value={application.tinNumber}
              onChange={(e) => handleInputChange("fatherName", e.target.value)}
              name="fatherName"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fatherName" className="text-right">
              GSIS BP
            </Label>
            <InputField
              type="text"
              value={application.gsisNumber}
              onChange={(e) => handleInputChange("fatherName", e.target.value)}
              name="fatherName"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motherContactNumber" className="text-right">
              Plantilla Number{" "}
            </Label>
            <InputField
              type="text"
              value={application.plantillaNumber}
              onChange={(e) =>
                handleInputChange("motherContactNumber", e.target.value)
              }
              name="motherContactNumber"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <DialogFooter>
          <span className="mt-8 flex w-full flex-col gap-4">
            <ArchiveAccountConfirmationAlertDialog
              userType="admin"
              userId={application._id}
            />
            <Button type="submit" variant="outline" className="w-full">
              Close
            </Button>
          </span>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
