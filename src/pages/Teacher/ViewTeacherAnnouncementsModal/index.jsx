import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAnnouncements from "./hooks/useAnnouncements";
import AnnouncementCard from "./AnnouncementCard";
import useFilteredAnnouncements from "./hooks/useFilteredAnnouncements";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ViewTeacherAnnouncementsModal() {
  const [filter, setFilter] = useState("all");
  const { filteredAnnouncements, loading, error } =
    useFilteredAnnouncements(filter);

  const announcements = filteredAnnouncements;
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

  const toggleContent = (announcementId) => {
    setExpandedAnnouncement((prevExpanded) =>
      prevExpanded === announcementId ? null : announcementId,
    );
  };

  const sortedAnnouncements = [...announcements].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Announcements</DialogTitle>
          <DialogDescription>
            Here are the latest announcements.
          </DialogDescription>
        </DialogHeader>

        <Select value={filter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Classes" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Announcements</SelectItem>
              <SelectItem value="public">Public Announcements</SelectItem>
              <SelectItem value="class">Class Announcements</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

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
    </>
  );
}
