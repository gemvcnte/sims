import React from "react";
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

export default function ChangePasswordDrawer() {
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
              <Input placeholder="" />
            </div>
            <div className="px-4 py-1">
              <Label htmlFor="" className="font-normal text-muted-foreground">
                New Password
              </Label>
              <Input placeholder="" />
            </div>
            <div className="px-4 py-1">
              <Label htmlFor="" className="font-normal text-muted-foreground">
                Repeat Password
              </Label>
              <Input placeholder="" />
            </div>
          </section>

          <DrawerFooter>
            <Button>Change Password</Button>
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
