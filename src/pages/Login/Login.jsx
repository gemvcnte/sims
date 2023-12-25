import React, { useEffect, useState } from "react";
import RoleSelectionContainer from "./components/RoleSelectionContainer";
import Header from "./components/Header";
import AnnouncementsModal from "./components/AnnouncementsModal";

function Login() {
  useEffect(() => {
    document.body.style.backgroundColor = "var(--clr-white-400)";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements from your API endpoint
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/announcement");
        const data = await response.json();
        setAnnouncements(data.data); // Assuming data is structured as in your server response
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <>
      <AnnouncementsModal announcements={announcements} />

      <Header />
      <RoleSelectionContainer />
    </>
  );
}

export default Login;
