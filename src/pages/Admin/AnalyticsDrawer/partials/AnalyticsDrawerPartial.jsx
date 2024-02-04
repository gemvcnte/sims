import { AnalyticsTabs } from "./AnalyticsTabs";
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
import { useAnalyticsContext } from "../context/AnalyticsContext";

export default function AnalyticsDrawerPartial() {
  const { analyticsData, loading, error } = useAnalyticsContext();

  if (loading) {
    console.log("loading...");
  } else {
    console.log(analyticsData);
  }

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
              <AnalyticsTabs />
            </DrawerDescription>
          </DrawerHeader>

          {/* <DrawerFooter>
            <DrawerClose className="w-full">
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter> */}
        </section>
      </DrawerContent>
    </Drawer>
  );
}
