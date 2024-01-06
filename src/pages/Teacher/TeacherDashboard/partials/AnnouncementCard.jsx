import React from "react";
import { Icon } from "@iconify/react";

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
      <div className="mt-2 text-sm text-gray-400">{announcement.content}</div>
    )}
  </div>
);

export default AnnouncementCard;
