import React from "react";
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
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function StepTwo() {
  const {
    step,
    nextStep,
    prevStep,
    enrollmentData,
    setEnrollmentData,
    hasAccount,
  } = useEnrollment();

  if (step !== 2 || hasAccount) return null;

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: enrollmentData,
  });

  const onSubmit = (data) => {
    const formattedData = { ...data, birthDate: formatDate(data.birthDate) };
    setEnrollmentData({ ...formattedData, ...enrollmentData });

    nextStep();
  };

  return (
    <>
      <header className="py-6 text-center">
        <h4>Step 2</h4>
        <h1 className="text-2xl">Guardian's / Parent's Information</h1>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto space-y-8 px-24 lg:px-[12.5rem]"
        >
          <section className="flex flex-col justify-between gap-8 ">
            <div className="flex justify-between gap-24">
              <FormField
                control={form.control}
                name="guardianName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Guardian's Name{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your guardian's name"
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
                name="guardianContactNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Guardian's Contact Number{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="eg. 09123456789"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="guardianRelationship"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Relationship <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Relationship" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Relative">Relative</SelectItem>
                          <SelectItem value="Non-relative">
                            Non-relative
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-4 h-[.5px] bg-muted" />

            <div className="flex justify-between gap-24">
              <FormField
                control={form.control}
                name="fatherName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Father's Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your father's name"
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
                name="fatherContactNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Father's Contact Number </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="eg. 09123456789"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between gap-24">
              <FormField
                control={form.control}
                name="motherName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Mother's Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your mother's name"
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
                name="motherContactNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Mother's Contact Number </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="eg. 09123456789"
                        {...field}
                      />
                    </FormControl>
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
