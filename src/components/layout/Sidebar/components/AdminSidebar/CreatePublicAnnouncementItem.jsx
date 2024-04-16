import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import CreateAnnouncementModal from "@/pages/Admin/CreateAnnouncementModal";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreatePublicAnnouncementItem() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClick = (event) => {
    // event.preventDefault();
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          <Link onClick={handleDialogClick}>Create Public Announcement</Link>
        </button>
      </DialogTrigger>
      <CreateAnnouncementModal onClose={handleDialogClick} />
    </Dialog>
  );
}
