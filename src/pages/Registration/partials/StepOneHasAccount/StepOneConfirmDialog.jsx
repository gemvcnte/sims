import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEnrollment } from "../../useEnrollment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGlobalSettings from "../../useGlobalSettings";
import axiosInstance from "@/utils/axios";
import { registrationEndpoint } from "@/config/adminEndpoints";
import { toast } from "react-toastify";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import TermsOfServiceDialog from "@/components/terms-of-service-dialog";
import PrivacyPolicyDialog from "@/components/privacy-policy-dialog";
import ShowSuccessNotification from "@/utils/ShowSuccessNotification";

export function StepOneConfirmDialog() {
  const { enrollmentData, setEnrollmentData, prevStep, setHasAccount } =
    useEnrollment();
  const { globalSettings } = useGlobalSettings();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(registrationEndpoint, data);
      if (response.status === 200) {
        ShowSuccessNotification("Data submitted successfully");

        setLoading(false);
        setEnrollmentData({});
        prevStep();
        setHasAccount(null);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        showErrorNotification(error.response.data.error);
      } else if (error.message) {
        showErrorNotification(error.response.data.message);
      } else {
        showErrorNotification("Unexpected error occurred.");
      }
      setLoading(false);
    }
  };

  const handleConfirmSubmission = (e) => {
    e.preventDefault();

    const objectWithBackendSchemaStructure = {
      schoolYear: {
        year: globalSettings.schoolYear,
        semester: globalSettings.semester,
        gradeLevel: enrollmentData.gradeLevel,
        track: enrollmentData.track,
        strand: enrollmentData.strand,
      },
      ...enrollmentData,
      hasAccount: true,
    };

    handleSubmit(objectWithBackendSchemaStructure);
  };

  return (
    <DialogContent className={"max-h-[80%] overflow-y-scroll lg:max-w-[720px]"}>
      <DialogHeader>
        <DialogTitle>Review Information</DialogTitle>
        <DialogDescription>
          Review your information before clicking the submit button below.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastName" className="text-right">
            Last Name
          </Label>
          <Input
            disabled
            id="lastName"
            defaultValue={enrollmentData.lastName}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstName" className="text-right">
            First Name
          </Label>
          <Input
            disabled
            id="firstName"
            defaultValue={enrollmentData.firstName}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lrn" className="text-right">
            LRN
          </Label>
          <Input
            disabled
            id="lrn"
            defaultValue={enrollmentData.lrn}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="gradeLevel" className="text-right">
            Grade Level
          </Label>
          <Input
            disabled
            id="gradeLevel"
            defaultValue={enrollmentData.gradeLevel}
            className="col-span-3"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <Label htmlFor="strand" className="w-[32%] text-right">
            Strand
          </Label>
          <Select defaultValue={enrollmentData.strand} disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select strand" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="humss">HUMSS (Academic)</SelectItem>
                <SelectItem value="abm">ABM (Academic)</SelectItem>
                <SelectItem value="stem">STEM (Academic)</SelectItem>
                <SelectItem value="ict">ICT (TVL)</SelectItem>
                <SelectItem value="he">HE (TVL)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <form onSubmit={handleConfirmSubmission}>
        <section className="flex justify-end pb-4">
          <section className="items-top inline-block w-[74%] gap-2 rounded-md border px-8 py-4">
            <Checkbox id="terms1" required className="relative top-[4px]" />
            <div className="ml-2 inline flex-col gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
              <p className="ml-6 text-sm text-muted-foreground">
                By checking this box, you're agreeing to our <br />
                <TermsOfServiceDialog>
                  <span className="mr-[1ch] underline underline-offset-4 hover:cursor-pointer">
                    Terms of Service{" "}
                  </span>
                </TermsOfServiceDialog>
                and{" "}
                <PrivacyPolicyDialog>
                  <span className=" underline underline-offset-4 hover:cursor-pointer">
                    Privacy Policy
                  </span>
                </PrivacyPolicyDialog>
                .
              </p>
            </div>
          </section>
        </section>

        <DialogFooter>
          <Button type="submit" size="lg" className="px-12" disabled={loading}>
            Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
