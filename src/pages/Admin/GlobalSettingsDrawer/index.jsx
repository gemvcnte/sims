import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useGlobalSettings from "./helpers/useGlobalSettings";

export function GlobalSetttingsDrawer({ onClose }) {
  const { loading, error, updateGlobalSettings } = useGlobalSettings();
  const [schoolYear, setSchoolYear] = React.useState("");
  const [semester, setSemester] = React.useState("");

  React.useEffect(() => {
    const storedGlobalSettings = JSON.parse(
      localStorage.getItem("globalSettings"),
    );
    if (storedGlobalSettings) {
      setSchoolYear(storedGlobalSettings.schoolYear);
      setSemester(storedGlobalSettings.semester);
    }
  }, []);

  const handleSaveSettings = () => {
    updateGlobalSettings({ schoolYear, semester });
    onClose();
  };

  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>School Year and Semester</DrawerTitle>
          <DrawerDescription>
            Set the current school year and semester.
          </DrawerDescription>
        </DrawerHeader>

        <section className="flex flex-col gap-4 p-4">
          <div>
            <Label className="text-muted-foreground">School Year</Label>
            <Select
              value={schoolYear}
              onValueChange={(value) => setSchoolYear(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select school year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>School Year</SelectLabel>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                  <SelectItem value="2026-2027">2026-2027</SelectItem>
                  <SelectItem value="2028-2029">2028-2029</SelectItem>
                  <SelectItem value="2029-2030">2029-2030</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-muted-foreground">Semester</Label>
            <Select
              value={semester}
              onValueChange={(value) => setSemester(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Semester</SelectLabel>
                  <SelectItem value="first semester">First Semester</SelectItem>
                  <SelectItem value="second semester">
                    Second Semester
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>

        <DrawerFooter>
          <Button onClick={handleSaveSettings}>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}
