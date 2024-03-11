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
import ViewTeacherAnnouncementsModal from "../../ViewTeacherAnnouncementsModal";

export default function DashboardAnnouncementCard() {
  const { announcements, loading, error } = useAnnouncements();
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

  const toggleContent = (announcementId) => {
    setExpandedAnnouncement((prevExpanded) =>
      prevExpanded === announcementId ? null : announcementId,
    );
  };

  const twoMostRecentAnnouncements = announcements.slice(0, 2);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogClick = () => {
    setIsDialogOpen(!isDialogOpen);
  };

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="w-full">
            <span onClick={handleDialogClick}>
              <Button variant="outline" className="w-full">
                View all announcements
              </Button>
            </span>
          </DialogTrigger>
          <ViewTeacherAnnouncementsModal onClose={handleDialogClick} />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
