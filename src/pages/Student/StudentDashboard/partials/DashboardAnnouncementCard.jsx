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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ViewStudentAnnouncementsModal from "../../ViewStudentAnnouncementsModal";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardAnnouncementCard() {
  const { announcements, loading, error } = useAnnouncements();
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

  const toggleContent = (announcementId) => {
    setExpandedAnnouncement((prevExpanded) =>
      prevExpanded === announcementId ? null : announcementId,
    );
  };

  const mostRecentAnnouncement = announcements.slice(0, 1);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogClick = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <Card className="">
      <CardHeader>
        Most Recent Announcement
        <span className="text-sm text-muted-foreground">
          Stay informed with the latest updates! Check out the most recent
          announcement
        </span>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        {loading && <Skeleton className="mb-2 h-24" />}

        {!loading && !error && (
          <>
            {mostRecentAnnouncement.map((announcement) => (
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="w-full">
            <span onClick={handleDialogClick} className="w-full">
              <Button variant="outline" className="w-full">
                View announcements
              </Button>
            </span>
          </DialogTrigger>
          <ViewStudentAnnouncementsModal onClose={handleDialogClick} />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
