import React from "react";
import { Icon } from "@iconify/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateAnnouncementModal from "./UpdateAnnouncementModal";

const AnnouncementCard = ({
  announcement,
  expandedAnnouncement,
  toggleContent,
}) => (
  <div key={announcement._id} className="mb-4 rounded-lg border p-4">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="break-words font-semibold">{announcement.title}</h2>
        <p className="text-xs text-muted-foreground">
          {new Date(announcement.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
    <section className="flex items-baseline justify-between text-xs">
      <button
        className="group mt-4 flex items-center justify-center gap-1"
        variant="outline"
        onClick={() => toggleContent(announcement._id)}
      >
        {expandedAnnouncement === announcement._id ? (
          <>
            Hide Details
            <Icon
              icon="dashicons:arrow-up"
              rotate={2}
              className="inline-block transform transition-all duration-300 group-hover:ml-1 group-hover:rotate-[360deg]"
            />
          </>
        ) : (
          <>
            Show Details
            <Icon
              icon="dashicons:arrow-up"
              rotate={1}
              className="inline-block transform transition-all duration-300 group-hover:rotate-[360deg]"
            />
          </>
        )}
      </button>

      <Dialog>
        <DialogTrigger>
          <button className="group">
            Update{" "}
            <Icon
              icon="octicon:arrow-down-24"
              rotate={3}
              className="inline-block -rotate-45 transform transition-all duration-300 group-hover:rotate-45"
            />
          </button>
        </DialogTrigger>
        <UpdateAnnouncementModal announcement={announcement} />
      </Dialog>
    </section>
    {expandedAnnouncement === announcement._id && (
      <div className="mt-2 text-sm text-gray-400">{announcement.content}</div>
    )}
  </div>
);

export default AnnouncementCard;
