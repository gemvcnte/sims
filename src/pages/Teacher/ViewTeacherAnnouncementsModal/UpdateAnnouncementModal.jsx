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
import { updateAnnouncementApi } from "./helpers/updateAnnouncementApi.js";
import { deleteAnnouncementApi } from "./helpers/deleteAnnouncementApi";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAnnouncementsContext } from "@/pages/Admin/AdminDashboard/hooks/useAnnouncements.jsx";
import { Loader2 } from "lucide-react";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title cannot exceed 50 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(10, "Content must be at least 10 characters")
    .max(255, "Content cannot exceed 255 characters"),
});

export default function UpdateAnnouncementModal({ announcement, onClose }) {
  const { refetchAnnouncements } = useAnnouncementsContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: announcement,
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { title, content } = getValues();

      const updatedAnnouncementData = {
        announcementId: announcement._id,
        title,
        content,
      };

      await updateAnnouncementApi(updatedAnnouncementData);

      refetchAnnouncements();
      onClose();
    } catch (error) {
      console.error("Error handling submit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Announcement</DialogTitle>
          <DialogDescription className="md:max-w-[80%]">
            Update an announcement by changing the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <CardContent className="grid gap-6 px-0">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter announcement title..."
                maxLength={51}
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
                maxLength={256}
              />
              {errors.content && (
                <span className="text-red-500">{errors.content.message}</span>
              )}
            </div>
          </CardContent>

          <DialogFooter>
            {!isLoading ? (
              <Button type="submit">
                <span>Save changes</span>
              </Button>
            ) : (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}
