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
import { updateAnnouncementApi } from "./helpers/updateAnnouncementApi";
import { deleteAnnouncementApi } from "./helpers/deleteAnnouncementApi";

export default function UpdateAnnouncementModal({ announcement, onClose }) {
  const [title, setTitle] = useState(announcement.title || "");
  const [content, setContent] = useState(announcement.content || "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedAnnouncementData = {
        announcementId: announcement._id,
        title,
        content,
      };

      await updateAnnouncementApi(updatedAnnouncementData);

      onClose();
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  const deleteAnnouncement = async (event) => {
    event.preventDefault();

    try {
      await deleteAnnouncementApi(announcement._id);

      onClose();
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Announcement</DialogTitle>
          <DialogDescription className="md:max-w-[80%]">
            Update an announcement by changing the details below.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <CardContent className="grid gap-6 px-0">
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
            <Button
              // className="border-red-500 text-red-500 hover:text-red-500"
              variant="outline"
              onClick={deleteAnnouncement}
            >
              Delete
            </Button>
            <Button onClick={handleSubmit}>Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}
