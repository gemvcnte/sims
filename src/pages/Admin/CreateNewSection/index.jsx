import { useState } from "react";
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
import SelectAdviserCombobox from "./SelectAdviserCombobox";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import { createSectionApi } from "./helpers";
import showErrorNotification from "@/utils/ShowErrorNotification";

export default function CreateNewSection({ onClose }) {
  const [sectionName, setSectionName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState(null);
  const [selectedStrand, setSelectedStrand] = useState("");

  const handleCreateSectionButton = async (e) => {
    e.preventDefault();
    const sectionDetails = {
      sectionName: sectionName,
      adviser: selectedTeacher ? selectedTeacher.username : "",
      gradeLevel: selectedGradeLevel,
      strand: selectedStrand,
    };

    if (!selectedTeacher) {
      showErrorNotification("Please select a teacher.");
      return;
    }

    const result = await createSectionApi(sectionDetails);

    result.success
      ? (showSuccessNotification(result.message),
        setSectionName(""),
        setSelectedGradeLevel(null),
        setSelectedStrand(""),
        onClose())
      : showErrorNotification(result.message);
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Section</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleCreateSectionButton}>
          <div className="flex justify-end gap-4">
            <select
              className="col-span-3 flex h-10  rounded-md border border-input bg-background object-contain px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedGradeLevel || ""}
              required
              name="gradeLevel"
              onChange={(e) => setSelectedGradeLevel(parseInt(e.target.value))}
            >
              <option value="">Grade Level</option>
              <option value={11}>GRADE 11</option>
              <option value={12}>GRADE 12</option>
            </select>

            <select
              className="col-span-3 flex h-10 rounded-md border border-input bg-background object-contain px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedStrand}
              required
              name="strand"
              onChange={(e) => setSelectedStrand(e.target.value)}
            >
              <option value="">Strand</option>
              <option value="ABM">ABM</option>
              <option value="STEM">STEM</option>
              <option value="HUMSS">HUMSS</option>
              <option value="TVL-ICT">TVL-ICT</option>
              <option value="TVL-HE">TVL-HE</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              required
              id="name"
              placeholder="Enter Section Name"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Adviser
            </Label>
            <SelectAdviserCombobox onSelectTeacher={setSelectedTeacher} />
          </div>

          <DialogFooter>
            <Button type="submit">Create Section</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}
