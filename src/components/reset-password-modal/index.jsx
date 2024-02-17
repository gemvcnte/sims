import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectStudentCombobox from "./helpers/SelectStudentCombobox";

export default function ResetPasswordModal() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSubmit = () => {
    console.log(selectedStudent);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Reset Student Password</DialogTitle>
        <DialogDescription className="sm:max-w-[80%]">
          Ensure to choose the correct student account below.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Student
          </Label>
          <SelectStudentCombobox onSelectStudent={setSelectedStudent} />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>Reset Password</Button>
      </DialogFooter>
    </DialogContent>
  );
}
