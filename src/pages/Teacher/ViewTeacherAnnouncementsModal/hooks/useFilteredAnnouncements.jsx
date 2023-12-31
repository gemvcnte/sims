import { useEffect, useState } from "react";
import useAnnouncements from "./useAnnouncements";

const useFilteredAnnouncements = (filter) => {
  const { announcements, loading, error } = useAnnouncements();
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredAnnouncements(announcements);
    } else if (filter === "public") {
      setFilteredAnnouncements(
        announcements.filter((announcement) => announcement.isPublic),
      );
    } else if (filter === "class") {
      setFilteredAnnouncements(
        announcements.filter((announcement) => !announcement.isPublic),
      );
    }
  }, [announcements, filter]);

  return { filteredAnnouncements, loading, error };
};

export default useFilteredAnnouncements;
