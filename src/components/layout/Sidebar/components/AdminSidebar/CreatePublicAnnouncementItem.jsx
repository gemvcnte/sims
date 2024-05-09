import ButtonDropdownItem from "@/components/button-dropdown-item";
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
        <Link onClick={handleDialogClick}>
          <ButtonDropdownItem>Create Public Announcement </ButtonDropdownItem>
        </Link>
      </DialogTrigger>
      <CreateAnnouncementModal onClose={handleDialogClick} />
    </Dialog>
  );
}
