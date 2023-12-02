import React, { useState } from "react";
import axios from "axios";
import showSuccessNotification from "@utils/showSuccessNotification";
import { ToastContainer } from "react-toastify";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  enrollApplicationEndpoint,
  rejectApplicationEndpoint,
} from "@/config/adminEndpoints";

export default function StudentCard({ application, onClick }) {
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
      const response = await axios.post(enrollApplicationEndpoint, {
        studentApplicationId: application._id,
      });

      showSuccessNotification("Student Enrolled Successfully");
      hideCard();
    } catch (error) {
      console.error("Error enrolling student:", error.message);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.patch(rejectApplicationEndpoint, {
        studentApplicationId: application._id,
      });
      console.log(response);

      showSuccessNotification("Application Rejected");
      hideCard();
    } catch (error) {
      console.error("Error enrolling student:", error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <DialogTrigger
        className={`${
          isCardHidden ? "hidden" : "flex"
        } border-white-700 bg-white-600 w-full items-center justify-between rounded-2xl border px-4 py-6`}
        onClick={() => onClick && onClick(application)}
      >
        <h2 className="text-left font-bold">{fullName}</h2>
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
          <span className="hidden items-center justify-center gap-2 text-xs text-muted-foreground sm:flex">
            <Icon icon="lets-icons:status" />
            <p>{application.status}</p>
          </span>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleReject();
            }}
            variant="outline"
          >
            Reject
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleEnroll();
            }}
          >
            Enroll
          </Button>
        </div>
      </DialogTrigger>
    </>
  );
}
