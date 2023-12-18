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
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createAnnouncementApi } from "./helpers";

export default function CreateAnnouncementModal({ onClose }) {
  const [typeOfAnnouncement, setTypeOfAnnouncement] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const resetAnnouncementData = () => {
    setTypeOfAnnouncement("");
    setTitle("");
    setContent("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const announcementData = {
        typeOfAnnouncement,
        title,
        content,
      };

      await createAnnouncementApi(announcementData);

      resetAnnouncementData();
      onClose();
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Announcement</DialogTitle>
          <DialogDescription className="md:max-w-[80%]">
            Add a new announcement by providing the required details below.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <CardContent className="grid gap-6 px-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="typeOfAnnouncement">Announcement Type</Label>
                <select
                  className="col-span-3 flex h-10 rounded-md border border-input bg-background object-contain px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  id="typeOfAnnouncement"
                  value={typeOfAnnouncement}
                  onChange={(e) => setTypeOfAnnouncement(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Type
                  </option>
                  <option value="Holiday">Holiday</option>
                  <option value="Exam">Exam</option>
                  <option value="School Event">Event</option>
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
