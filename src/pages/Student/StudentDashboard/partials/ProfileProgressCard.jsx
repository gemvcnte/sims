import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { Link } from "react-router-dom";

export default function ProfileProgressCard() {
  const calculateProfileCompletion = () => {
    const studentProfileString = localStorage.getItem("studentProfile");

    if (!studentProfileString) {
      return 0;
    }

    const studentProfile = JSON.parse(studentProfileString);

    const fieldsToCheck = [
      "lrn",
      "schoolYear",
      "semester",
      "strand",
      "lastName",
      "firstName",
      "middleName",
      "extensionName",
      "birthDate",
      "gender",
      "currentAddress",
      "emailAddress",
      "fatherName",
      "motherName",
      "fatherContactNumber",
      "motherContactNumber",
      "guardianName",
      "guardianContactNumber",
      "guardianRelationship",
      "religion",
      "province",
      "barangay",
      "city",
      "zipCode",
    ];

    const emptyFieldCount = fieldsToCheck.filter(
      (fieldName) => !studentProfile[fieldName],
    ).length;

    const totalFields = fieldsToCheck.length;

    const completionPercentage = Math.round(
      ((totalFields - emptyFieldCount) / totalFields) * 100,
    );

    return completionPercentage;
  };

  const profileCompletionPercentage = calculateProfileCompletion();

  return (
    <Card className="h-fit md:order-2 md:w-[40%]">
      <CardHeader>
        Complete your profile
        <span className="text-sm text-muted-foreground">
          Attain 100% profile completion to ensure that your profile is fully
          optimized
        </span>
        <span className="flex items-center gap-2">
          {profileCompletionPercentage}%
          <Progress value={profileCompletionPercentage} />
        </span>
      </CardHeader>
      <CardContent>
        <Link to="/profile">
          <Button variant="outline" className="-mt-2 w-full">
            Complete profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
