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
        <DropdownMenuItem>
          <Link onClick={handleDialogClick}>View Announcements</Link>
        </DropdownMenuItem>
      </DialogTrigger>
      <ViewTeacherAnnouncementsModal onClose={handleDialogClick} />
    </Dialog>
  );
}
