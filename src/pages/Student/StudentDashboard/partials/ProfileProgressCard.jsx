import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

export default function ProfileProgressCard() {
  return (
    <Card className="h-fit md:order-2 md:w-[40%]">
      <CardHeader>
        Complete your profile
        <span className="text-sm text-muted-foreground">
          By completing all the details you have a higher chance of being seen
          by baddies
        </span>
        <span className="flex items-center gap-2">
          79%
          <Progress value={79} />
        </span>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="-mt-2 w-full">
          Complete profile
        </Button>
      </CardContent>
    </Card>
  );
}
