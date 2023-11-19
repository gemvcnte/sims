import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSidebarContext } from "@contexts/SidebarContext.jsx";
import axios from "axios";
import StudentCard from "./components/StudentCard";

export default function ApplicationMonitoring() {
  const { toggleSidebar } = useSidebarContext();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/getPending",
        ); // Adjust the URL based on your API endpoint
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  console.log(userData);

  return (
    <section className="w-full">
      <header className="mx-4 flex justify-between border-b border-white-700 py-8 italic">
        <Icon
          icon="heroicons-outline:menu-alt-2"
          width="24"
          height="24"
          className="cursor-pointer lg:hidden"
          onClick={toggleSidebar}
        />
        <span>STUDENT APPLICATION MONITORING</span>
        <span></span>
      </header>

      <main className="flex flex-col gap-4 p-4">
        {userData.map((user) => (
          <StudentCard key={user._id} user={user} userId={user._id} />
        ))}
      </main>
    </section>
  );
}
