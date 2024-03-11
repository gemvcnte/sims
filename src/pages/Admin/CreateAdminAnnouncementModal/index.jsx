import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createAdminAnnouncementApi } from "./helpers/createAdminAnnouncementApi";
import getTeacherAssignedClassesApi from "./helpers/getTeacherAssignedClassesApi";

const schema = yup.object().shape({
  selectedClass: yup.string().required("Class is required"),
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

export default function CreateAdminClassAnnouncementModal({ onClose }) {
  const [classes, setClasses] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const onSubmit = async (data) => {
    try {
      // Rename selectedClass to classId
      const { selectedClass, ...formData } = data;
      const formDataWithRenamedKey = { classId: selectedClass, ...formData };

      await createAdminAnnouncementApi(formDataWithRenamedKey);
      reset();
      onClose();
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

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
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6 px-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="selectedClass">Class</Label>
                <select
                  id="selectedClass"
                  {...register("selectedClass")}
                  className="col-span-3 flex h-10 rounded-md border border-input bg-background object-contain px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a Class</option>
                  {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem._id}>
                      {classItem.sectionName}
                    </option>
                  ))}
                </select>
                {errors.selectedClass && (
                  <span className="text-red-500">
                    {errors.selectedClass.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter announcement title..."
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                {...register("content")}
                placeholder="Enter announcement content..."
              />
              {errors.content && (
                <span className="text-red-500">{errors.content.message}</span>
              )}
            </div>
          </CardContent>

          <DialogFooter>
            <Button type="submit">
              <span>
                Create <span className="hidden sm:inline">class</span>{" "}
                announcement
              </span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}
