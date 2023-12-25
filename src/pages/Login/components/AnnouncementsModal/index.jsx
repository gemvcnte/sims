import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAnnouncements from "../../hooks/useAnnouncements";
import AnnouncementCard from "./AnnouncementCard";

export default function AnnouncementModal() {
  const { announcements, loading, error } = useAnnouncements();

  const [isOpen, setIsOpen] = useState(true);
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

  const toggleContent = (announcementId) => {
    setExpandedAnnouncement((prevExpanded) =>
      prevExpanded === announcementId ? null : announcementId,
    );
  };

  const sortedAnnouncements = [...announcements].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <>
      <Dialog
        className=""
        isOpen={isOpen}
        defaultOpen={true}
        onOpenChange={setIsOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Announcements</DialogTitle>
            <DialogDescription>
              Here are the latest announcements.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-80 overflow-y-auto">
            {loading && <p>Loading announcements...</p>}
            {error && <p>Error fetching announcements</p>}

            {!loading && !error && (
              <>
                {sortedAnnouncements.map((announcement) => (
                  <AnnouncementCard
                    key={announcement._id}
                    announcement={announcement}
                    expandedAnnouncement={expandedAnnouncement}
                    toggleContent={toggleContent}
                  />
                ))}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
