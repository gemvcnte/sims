import React, { useState } from "react";
import { Icon } from "@iconify/react";

const AnnouncementCard = ({
  announcement,
  expandedAnnouncement,
  toggleContent,
}) => {
  const [showFullTitle, setShowFullTitle] = useState(false);

  const toggleTitle = () => {
    setShowFullTitle(!showFullTitle);
  };

  return (
    <div key={announcement._id} className="mb-4 rounded-lg border p-4">
      <div className="flex items-center justify-between overflow-hidden break-all">
        <div>
          <h2 className="overflow-hidden break-all font-semibold">
            {showFullTitle ? (
              announcement.title
            ) : (
              // Truncate the title if it exceeds 25 characters
              <>
                {announcement.title.length > 25
                  ? `${announcement.title.substring(0, 25)}...`
                  : announcement.title}
                {/* Show "See More" button if title is truncated */}
                {announcement.title.length > 25 && (
                  <button
                    className="text-xs italic text-muted-foreground hover:underline sm:ml-2"
                    onClick={toggleTitle}
                  >
                    Show Full Title
                  </button>
                )}
              </>
            )}
          </h2>{" "}
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
        <div className="mt-2 break-all text-sm text-gray-400">
          {announcement.content}
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;
