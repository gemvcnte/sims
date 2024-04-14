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
import { selectOptions } from "./selectOptions";

export default function StepOne() {
  const {
    step,
    nextStep,
    prevStep,
    enrollmentData,
    setEnrollmentData,
    hasAccount,
  } = useEnrollment();

  if (step !== 1 || hasAccount) return null;

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
        <h4>Step 1</h4>
        <h1 className="text-2xl">Learner Information</h1>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto space-y-8 px-24 lg:px-[12.5rem]"
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
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
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your middle name"
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
                name="extensionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extension Name</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || "None"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an extension name" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full flex-col gap-8">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date of Birth <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Gender <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Current Address{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Purok St, Barangay, Municipality"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Email" {...field} />
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
