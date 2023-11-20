import React, { useState } from "react";
import axios from "axios";
import showSuccessNotification from "@utils/ShowSuccessNotification";
import { ToastContainer } from "react-toastify";

export default function StudentCard({ application, onClick }) {
  const enrollmentEndpoint = "http://localhost:5000/admin/enrollStudent";
  const lastName = application.lastName.toLowerCase();
  const firstName = application.firstName.toLowerCase();
  const fullName = `${lastName.charAt(0).toUpperCase() + lastName.slice(1)}, ${
    firstName.charAt(0).toUpperCase() + firstName.slice(1)
  }`;

  const [isCardHidden, setIsCardHidden] = useState(false);

  const hideCard = () => {
    setIsCardHidden(true);
  };

  const handleEnroll = async () => {
    try {
      const response = await axios.post(enrollmentEndpoint, {
        studentApplicationId: application._id,
      });

      showSuccessNotification("Student Enrolled Successfully");
      hideCard();
    } catch (error) {
      console.error("Error enrolling student:", error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`${
          isCardHidden ? "hidden" : "flex"
        } w-full items-center justify-between rounded-2xl border border-white-700 bg-white-600 px-4 py-6`}
        onClick={() => onClick && onClick(application)}
      >
        <h2 className="">{fullName}</h2>
        <div className="flex items-center gap-8">
          <p>{application.status}</p>
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
