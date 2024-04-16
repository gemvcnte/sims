import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import CreateAdminClassAnnouncementModal from "@/pages/Admin/CreateAdminAnnouncementModal";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateClassAnnouncementItem() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClick = (event) => {
    // event.preventDefault();
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          <Link onClick={handleDialogClick}>Create Class Announcement</Link>
        </button>
      </DialogTrigger>
      <CreateAdminClassAnnouncementModal onClose={handleDialogClick} />
    </Dialog>
  );
}
