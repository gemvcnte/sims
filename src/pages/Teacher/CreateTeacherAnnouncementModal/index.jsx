import { useEffect, useState } from "react";
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
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getTeacherAssignedClassesApi } from "../TeacherClasses/helpers";
import { createTeacherAnnouncementApi } from "./helpers/createTeacherAnnouncementApi";
// import { createAnnouncementApi } from "./helpers";

export default function CreateTeacherAnnouncementModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const resetAnnouncementData = () => {
    setSelectedClass("");
    setTitle("");
    setContent("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const TeacherAnnouncementData = {
        classId: selectedClass,
        title,
        content,
      };

      await createTeacherAnnouncementApi(TeacherAnnouncementData);

      resetAnnouncementData();
      onClose();
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes = await getTeacherAssignedClassesApi();
        setClasses(classes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Class Announcement</DialogTitle>
          <DialogDescription className="md:max-w-[80%]">
            Add a new class announcement by providing the required details
            below.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <CardContent className="grid gap-6 px-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="class">Class</Label>
                <select
                  className="col-span-3 flex h-10 rounded-md border border-input bg-background object-contain px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  id="class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a Class
                  </option>
                  {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem._id}>
                      {classItem.sectionName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter announcement content..."
                required
              />
            </div>
          </CardContent>

          <DialogFooter>
            <Button type="submit">Create Section</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}
