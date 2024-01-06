import React from "react";
import useAnnouncements from "../hooks/useAnnouncements";

export default function AnnouncementCard() {
  const { announcements, loading, error } = useAnnouncements();

  return <div>announcement</div>;
}
