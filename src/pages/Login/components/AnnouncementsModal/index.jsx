import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import useAnnouncements from "../../hooks/useAnnouncements";

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
                  <div
                    key={announcement._id}
                    className="mb-4 rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="break-words font-semibold">
                          {announcement.title}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          {new Date(announcement.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                    <button
                      className="mt-4 flex justify-center gap-1 text-xs"
                      variant="outline"
                      onClick={() => toggleContent(announcement._id)}
                    >
                      {expandedAnnouncement === announcement._id ? (
                        <>
                          Hide Details
                          <Icon icon="dashicons:arrow-up" rotate={2} />
                        </>
                      ) : (
                        <>
                          Show Details
                          <Icon icon="dashicons:arrow-up" rotate={1} />
                        </>
                      )}
                    </button>
                    {expandedAnnouncement === announcement._id && (
                      <div className="mt-2 text-sm text-gray-400">
                        {announcement.content}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
