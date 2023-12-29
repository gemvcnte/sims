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
        <DropdownMenuItem>
          <Link onClick={handleDialogClick}>Create Class Announcement</Link>
        </DropdownMenuItem>
      </DialogTrigger>
      <CreateAdminClassAnnouncementModal onClose={handleDialogClick} />
    </Dialog>
  );
}
