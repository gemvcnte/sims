import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEnrollment } from "../../useEnrollment";
import { schema } from "./schema";
import { Dialog } from "@/components/ui/dialog";
import { StepOneConfirmDialog } from "./StepOneConfirmDialog";

export default function StepOneHasAccount() {
  const { step, prevStep, enrollmentData, setEnrollmentData, hasAccount } =
    useEnrollment();

  if (step !== 1 || !hasAccount) return null;

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: enrollmentData,
  });

  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = (data) => {
    let trackValue = "";
    if (
      data.strand === "abm" ||
      data.strand === "humss" ||
      data.strand === "stem"
    ) {
      trackValue = "academic";
    } else {
      trackValue = "tvl";
    }

    setEnrollmentData({ ...enrollmentData, ...data, track: trackValue });

    setShowDialog(true);
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <StepOneConfirmDialog />
      </Dialog>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex h-[100svh] flex-col justify-center space-y-8 px-24 lg:px-[12.5rem]"
        >
          <section className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-24">
            <div className="flex w-full flex-col gap-8">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        {...field}
                        onChange={(e) => {
                          const uppercaseValue = e.target.value.toUpperCase();
                          field.onChange(uppercaseValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lrn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      LRN (Learner Reference Number){" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your learner reference number"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gradeLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Grade Level <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your grade level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="11">Grade 11</SelectItem>
                        <SelectItem value="12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="strand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Strand <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your strand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="humss">HUMSS (Academic)</SelectItem>
                        <SelectItem value="abm">ABM (Academic)</SelectItem>
                        <SelectItem value="stem">STEM (Academic)</SelectItem>
                        <SelectItem value="ict">ICT (TVL)</SelectItem>
                        <SelectItem value="he">HE (TVL)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className="flex items-end justify-end pb-8">
            <button
              onClick={() => prevStep()}
              className="mr-4 rounded-lg border border-muted px-12 py-4 text-right hover:border-primary hover:text-primary"
            >
              Back
            </button>
            <button
              type="submit"
              className="group flex w-fit transform-gpu items-center gap-2 rounded-lg bg-primary px-12 py-4 text-right text-primary-foreground transition-transform hover:-translate-x-[-16px] focus:-translate-x-[-16px] focus:outline-none"
            >
              Next Step
              <ChevronRight
                className="transform-gpu transition-transform duration-300 group-hover:translate-x-8 group-focus:translate-x-8"
                color="white"
                rotate={1}
              />
            </button>
          </section>
        </form>
      </Form>
    </>
  );
}

// Function to format date as "YYYY-MM-DD"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
