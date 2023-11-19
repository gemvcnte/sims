import React, { useState } from "react";
import axios from "axios";
import showSuccessNotification from "@utils/ShowSuccessNotification";
import { ToastContainer } from "react-toastify";

export default function StudentCard({ user, userId }) {
  const endpoint = "http://localhost:5000/admin/enrollStudent";
  const lastName = user.lastName.toLowerCase();
  const firstName = user.firstName.toLowerCase();
  const fullName = `${lastName.charAt(0).toUpperCase() + lastName.slice(1)}, ${
    firstName.charAt(0).toUpperCase() + firstName.slice(1)
  }`;

  const [isHidden, setIsHidden] = useState(false);

  const hideTheCard = () => {
    setIsHidden(true);
  };

  const handleEnroll = async () => {
    try {
      const response = await axios.post(`${endpoint}`, {
        studentApplicationId: userId,
      });

      showSuccessNotification("Student Enrolled Successfully");
      hideTheCard();
    } catch (error) {
      console.error("Error enrolling student:", error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`${
          isHidden ? "hidden" : "flex"
        } w-full items-center justify-between rounded-2xl border border-white-700 bg-white-600 px-4 py-6`}
      >
        <h2 className="">{fullName}</h2>
        <div className="flex items-center gap-8">
          <p>{user.status}</p>
          <button
            onClick={handleEnroll}
            className="rounded-full border border-black-400 px-4 py-1"
          >
            Reject
          </button>
          <button
            onClick={handleEnroll}
            className="rounded-full border border-black-400 bg-black-400 px-4 py-1 text-white-400"
          >
            Enroll
          </button>
        </div>
      </div>
    </>
  );
}
