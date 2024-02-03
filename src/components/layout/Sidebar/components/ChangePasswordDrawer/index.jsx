import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import showErrorNotification from "@/utils/ShowErrorNotification";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import updatePasswordApi from "./update-password-api";

export default function ChangePasswordDrawer({ userType }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      if (newPassword !== repeatPassword) {
        showErrorNotification("New password and repeat password do not match.");
        return;
      }

      const response = await updatePasswordApi(
        currentPassword,
        newPassword,
        userType,
      );


      showSuccessNotification(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch (error) {
      showErrorNotification(error.response?.data.message);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="ghost" className="w-full justify-start">
          <Icon icon="mdi:password-outline" className="mr-2" />
          Password
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <section className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Update Password</DrawerTitle>
            <DrawerDescription>
              We recommend updating your password regularly
            </DrawerDescription>
          </DrawerHeader>

          <section>
            <div className="px-4 py-1">
              <Label htmlFor="" className="font-normal text-muted-foreground">
                Current Password
              </Label>
              <Input
                placeholder=""
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
            </div>
            <div className="px-4 py-1">
              <Label htmlFor="" className="font-normal text-muted-foreground">
                New Password
              </Label>
              <Input
                placeholder=""
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </div>
            <div className="px-4 py-1">
              <Label htmlFor="" className="font-normal text-muted-foreground">
                Repeat Password
              </Label>
              <Input
                placeholder=""
                value={repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
            </div>
          </section>

          <DrawerFooter>
            <Button onClick={handleChangePassword}>Change Password</Button>
            <DrawerClose className="w-full">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </section>
      </DrawerContent>
    </Drawer>
  );
}
