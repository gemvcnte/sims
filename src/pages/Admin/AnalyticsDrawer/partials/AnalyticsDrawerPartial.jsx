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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsDrawerPartial() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="ghost" className="w-full justify-start">
          <Icon icon="material-symbols:analytics-outline" className="mr-2" />
          Analytics
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <section className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            {/* <DrawerTitle>Analytics</DrawerTitle> */}
            <DrawerDescription>
              <Tabs defaultValue="students" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="students" className="w-full">
                    Students
                  </TabsTrigger>
                  <TabsTrigger value="faculty" className="w-full">
                    Faculty
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="students">students analytics</TabsContent>
                <TabsContent value="faculty">faculty analytics</TabsContent>
              </Tabs>
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
            <DrawerClose className="w-full">
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </section>
      </DrawerContent>
    </Drawer>
  );
}
