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
import { AnalyticsProvider } from "./context/AnalyticsContext";
import AnalyticsDrawerPartial from "./partials/AnalyticsDrawerPartial";

export default function AnalyticsDrawer() {
  return (
    <AnalyticsProvider>
      <AnalyticsDrawerPartial />
    </AnalyticsProvider>
  );
}
