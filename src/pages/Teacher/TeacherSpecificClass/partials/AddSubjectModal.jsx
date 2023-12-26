import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectTeacherCombobox from "./SelectTeacherCombobox";
import { useState } from "react";
import { useClassDetails } from "../contexts/ClassDetailsContext";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import { addSubjectApi } from "../helpers/addSubjectApi";

export default function AddSubjectModal({ onSuccess }) {
  const classDetailsContext = useClassDetails();
  const { classDetails } = classDetailsContext;

  const [subjectName, setSubjectName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [schedules, setSchedules] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const newSubjectData = {
        classId: classDetails._id,
        subjectName,
        subjectTeacher: selectedTeacher,
        schedules,
      };

      const response = await addSubjectApi(newSubjectData);

      showSuccessNotification(response.data.message);

      setSubjectName("");
      setSelectedTeacher("");
      setSchedules([{ day: "", startTime: "", endTime: "" }]);

      onSuccess();
      closeModal();
    } catch (error) {
      console.error("Error adding subject:", error.message);
    }
  };

  const addSchedule = () => {
    setSchedules([...schedules, { day: "", startTime: "", endTime: "" }]);
  };

  const removeSchedule = (index) => {
    if (schedules.length > 1) {
      const updatedSchedules = [...schedules];
      updatedSchedules.splice(index, 1);
      setSchedules(updatedSchedules);
    }
  };

  const updateSchedule = (index, field, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index][field] = value;
    setSchedules(updatedSchedules);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="mb-4 flex gap-4">
        <DialogTrigger asChild>
          <Button variant="outline">Add Subject</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
          <DialogDescription className="md:max-w-[80%]">
            Add a new subject by providing the required details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid h-80 gap-4 overflow-y-auto py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Subject <span className="hidden sm:inline">Name</span>
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="Enter Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teacher" className="text-right">
              Teacher
            </Label>
            <SelectTeacherCombobox onSelectTeacher={setSelectedTeacher} />
          </div>

          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="mt-8 grid grid-cols-4 items-center gap-4"
            >
              {schedules.length > 1 && (
                <Button
                  variant="text"
                  className="col-span-4 text-red-600"
                  onClick={() => removeSchedule(index)}
                >
                  Remove
                </Button>
              )}

              <Label htmlFor={`day-${index}`} className="text-right">
                Day
              </Label>
              <select
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id={`day-${index}`}
                value={schedule.day}
                onChange={(e) => updateSchedule(index, "day", e.target.value)}
              >
                <option value="" disabled>
                  Select Day
                </option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>

              <Label htmlFor={`startTime-${index}`} className="text-right">
                Start Time
              </Label>
              <Input
                className="col-span-3"
                id={`startTime-${index}`}
                type="time"
                value={schedule.startTime}
                onChange={(e) =>
                  updateSchedule(index, "startTime", e.target.value)
                }
              />

              <Label htmlFor={`endTime-${index}`} className="text-right">
                End Time
              </Label>
              <Input
                className="col-span-3"
                id={`endTime-${index}`}
                type="time"
                value={schedule.endTime}
                onChange={(e) =>
                  updateSchedule(index, "endTime", e.target.value)
                }
              />
            </div>
          ))}

          <Button variant="outline" onClick={addSchedule}>
            Add another schedule
          </Button>
        </div>

        <Button onClick={handleSaveChanges}>Add subject</Button>
      </DialogContent>
    </Dialog>
  );
}
