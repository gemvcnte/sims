import React, { useState } from "react";
import axios from "axios";
import showSuccessNotification from "@utils/ShowSuccessNotification";
import { ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";

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
        } border-white-700 bg-white-600 w-full items-center justify-between rounded-2xl border px-4 py-6`}
        onClick={() => onClick && onClick(application)}
      >
        <h2 className="font-bold">{fullName}</h2>
        <div className="flex items-center gap-8">
          <p className="text-xs text-muted-foreground">{application.status}</p>
          <Button onClick={handleEnroll} variant="outline">
            Reject
          </Button>
          <Button onClick={handleEnroll}>Enroll</Button>
        </div>
      </div>
    </>
  );
}
