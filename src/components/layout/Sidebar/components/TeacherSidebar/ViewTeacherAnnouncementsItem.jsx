import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import ViewTeacherAnnouncementsModal from "@/pages/Teacher/ViewTeacherAnnouncementsModal";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ViewTeacherAnnouncementsItem() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClick = (event) => {
    // event.preventDefault();
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          <Link onClick={handleDialogClick}>View Announcements</Link>
        </button>
      </DialogTrigger>
      <ViewTeacherAnnouncementsModal onClose={handleDialogClick} />
    </Dialog>
  );
}
