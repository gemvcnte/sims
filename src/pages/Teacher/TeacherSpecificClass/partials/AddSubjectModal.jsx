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
import SelectTeacherCombobox from "./SelectTeacherCombobox";
import { useState } from "react";

export default function AddSubjectModal() {
  const [selectedTeacher, setSelectedTeacher] = useState("");

  console.log(selectedTeacher);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Subject</DialogTitle>
        <DialogDescription className="md:max-w-[80%]">
          Add a new subject by providing the required details below.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Subject Name
          </Label>
          <Input
            id="name"
            className="col-span-3"
            placeholder="Enter Subject Name"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Teacher
          </Label>
          <SelectTeacherCombobox onSelectTeacher={setSelectedTeacher} />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}
