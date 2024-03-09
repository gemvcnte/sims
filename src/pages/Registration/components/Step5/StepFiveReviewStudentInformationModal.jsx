import React from "react";
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
    disabled
    className={`${className}`}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    name={name}
  />
);

const selectOptions = [
  { value: "", label: "None" },
  { value: "JR", label: "Jr" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
  { value: "NONE", label: "None" },
];

export default function StepFiveReviewStudentInformationModal({
  application,
  onSave,
  onClose,
}) {
  const handleSaveChanges = (e) => {
    e.preventDefault();
    onSave && onSave();
    onClose && onClose();
  };

  return (
    <DialogContent className={"max-h-[80%] overflow-y-scroll lg:max-w-[425px]"}>
      <form onSubmit={handleSaveChanges}>
        <DialogHeader>
          <DialogTitle>Review Information</DialogTitle>
          <DialogDescription>
            Review your information before clicking the submit button below.
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
              // placeholder="Input Your Last Name"
              defaultValue={application.lastName}
              name="lastName"
              disabled
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lrn" className="text-right">
              LRN
            </Label>
            <input
              disabled
              type="number"
              // placeholder="Input Your LRN"
              value={application.lrn}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="track" className="text-right">
              Grade Level
            </Label>
            <select
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="gradeLevel"
              value={application.gradeLevel}
            >
              <option value="">Grade Level</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="track" className="text-right">
              Track
            </Label>
            <select
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="track"
              value={application.track}
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
              disabled
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="strand"
              value={application.strand}
            >
              <option value="">Select Strand</option>
              <option value="humss">HUMSS (Academic)</option>
              <option value="abm">ABM (Academic)</option>
              <option value="stem">STEM (Academic)</option>
              <option value="ict">ICT (TVL)</option>
              <option value="he">HE (TVL)</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
