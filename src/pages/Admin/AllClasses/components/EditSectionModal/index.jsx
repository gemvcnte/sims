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
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import { SelectAdviserCombobox } from "./helpers";
import showErrorNotification from "@/utils/ShowErrorNotification";
import updateSectionApi from "./helpers/updateSectionApi";
import { useSections } from "../../hooks/useSections";

export default function EditSectionModal({ children, section }) {
  const { refetchData } = useSections();
  const [loading, setLoading] = useState(false);

  const sectionId = section?._id;

  const [sectionName, setSectionName] = useState(section.sectionName || "");
  const [selectedTeacher, setSelectedTeacher] = useState(
    section.adviser || null,
  );
  const [selectedGradeLevel, setSelectedGradeLevel] = useState(
    section.gradeLevel || null,
  );
  const [selectedStrand, setSelectedStrand] = useState(section.strand || "");

  const handleCreateSectionButton = async (e) => {
    e.preventDefault();
    setLoading(true);

    const sectionDetails = {
      sectionName: sectionName,
      adviser: selectedTeacher,
      gradeLevel: selectedGradeLevel,
      strand: selectedStrand,
    };

    if (!selectedTeacher) {
      showErrorNotification("Please select a teacher.");
      return;
    }

    const result = await updateSectionApi(sectionId, sectionDetails);

    result.success
      ? (showSuccessNotification(result.message),
        setSectionName(""),
        setSelectedGradeLevel(null),
        setSelectedStrand(""),
        refetchData())
      : showErrorNotification(result.message);

    setLoading(false);
  };

  const isOnUatEnvironment = import.meta.env.VITE_ENVIRONMENT === "uat";

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Existing Section</DialogTitle>
            <DialogDescription className="md:max-w-[80%]">
              Update the details of this classroom below.
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            onSubmit={handleCreateSectionButton}
          >
            <div className="flex justify-end gap-4">
              <select
                className="col-span-3 flex h-10  rounded-md border border-input bg-background object-contain px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedGradeLevel || ""}
                required
                name="gradeLevel"
                onChange={(e) =>
                  setSelectedGradeLevel(parseInt(e.target.value))
                }
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
                <option value="abm">ABM</option>
                <option value="stem">STEM</option>
                <option value="humss">HUMSS</option>
                <option value="ict">TVL-ICT</option>
                <option value="he">TVL-HE</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                maxLength={isOnUatEnvironment ? 25 : null}
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
              <SelectAdviserCombobox
                selectedTeacher={selectedTeacher}
                onSelectTeacher={setSelectedTeacher}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
