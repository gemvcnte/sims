import React, { useState } from "react";
import useAnnouncements from "../hooks/useAnnouncements";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnnouncementCard from "./AnnouncementCard";
import { Button } from "@/components/ui/button";

export default function DashboardAnnouncementCard() {
  const { announcements, loading, error } = useAnnouncements();
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

  const toggleContent = (announcementId) => {
    setExpandedAnnouncement((prevExpanded) =>
      prevExpanded === announcementId ? null : announcementId,
    );
  };

  const twoMostRecentAnnouncements = announcements.slice(0, 2);

  return (
    <Card className="md:w-[60%]">
      <CardHeader>Announcements</CardHeader>
      <CardContent className="px-4 pb-2">
        {!loading && !error && (
          <>
            {twoMostRecentAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement._id}
                announcement={announcement}
                expandedAnnouncement={expandedAnnouncement}
                toggleContent={toggleContent}
              />
            ))}
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline">View all</Button>
      </CardFooter>
    </Card>
  );
}
