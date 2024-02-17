import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectStudentCombobox from "./helpers/SelectStudentCombobox";
import showErrorNotification from "@/utils/ShowErrorNotification";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import { resetStudentPassword } from "./helpers/reset-student-password";
import SelectTeacherCombobox from "./helpers/SelectTeacherCombobox";
import { resetTeacherPasswordEndpoint } from "@/config/adminEndpoints";
import { resetTeacherPassword } from "./helpers/reset-teacher-password";

export default function ResetPasswordModal({ userType, onClose }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = async () => {
    if (!selectedUser) {
      showErrorNotification(`No ${userType} selected`);
      return;
    }

    try {
      showSuccessNotification(
        `Successfully resets ${userType.toLowerCase()}'s password`,
      );
      onClose();
      // Perform action based on userType
      switch (userType) {
        case "Student":
          await resetStudentPassword(selectedUser.lrn);
          break;
        case "Teacher":
          await resetTeacherPassword(selectedUser._id);
          break;
        case "Admin":
          // Code to reset admin password
          break;
        default:
          break;
      }
    } catch (error) {
      showErrorNotification(error.message);
    }
  };

  const renderUserTypeSpecificContent = () => {
    switch (userType) {
      case "Student":
        return <SelectStudentCombobox onSelectStudent={setSelectedUser} />;
      case "Teacher":
        // Return content for teacher
        return <SelectTeacherCombobox onSelectStudent={setSelectedUser} />;
      case "Admin":
        // Return content for admin
        return <div>Content for admin</div>;
      default:
        return null;
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Reset {userType} Password</DialogTitle>
        <DialogDescription className="sm:max-w-[80%]">
          Ensure to choose the correct {userType.toLowerCase()} account below.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            {userType}
          </Label>
          {renderUserTypeSpecificContent()}
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>Reset Password</Button>
      </DialogFooter>
    </DialogContent>
  );
}
