import React, { useState } from "react";
import Draggable from "react-draggable";
import master from "@/assets/master.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import ShowSuccessNotification from "@/utils/ShowSuccessNotification";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const schema = yup.object().shape({
  remarks: yup
    .string()
    .required("Reklamo is required")
    .min(10, "Reklamo must be at least 10 characters")
    .max(699, "Reklamo must be at most 699 characters"),
});

export default function UatFeedbackForm() {
  const isOnUatEnvironment = import.meta.env.VITE_ENVIRONMENT === "uat";

  if (!isOnUatEnvironment) return null;

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const [waitingForServerResponse, setWaitingForServerResponse] =
    useState(false);

  const onSubmit = async () => {
    form.reset();
    form.setValue("remarks", "");
    ShowSuccessNotification("Thank you for your feedback! ৻(  •̀ ᗜ •́  ৻)");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <div className="absolute top-0 z-[99999999999999999] overflow-visible p-8 ">
        <TooltipProvider delayDuration={10}>
          <Tooltip>
            <Draggable>
              <Accordion
                type="single"
                collapsible
                className="z-[9999999999999999] w-[26ch] rounded-md bg-background text-foreground"
              >
                <AccordionItem value="item-1">
                  <TooltipTrigger>
                    <AccordionTrigger className="rounded-md p-4 ">
                      <div className=" absolute right-0 top-0 z-[99999999999999999999999999999999999999999999] flex border-t-2 border-muted p-2">
                        <img
                          src={master}
                          alt=""
                          className="w-12 rounded-full"
                        />
                        <p>REPORT ISSUE TO SENPAI BOB 🗿</p>
                      </div>
                    </AccordionTrigger>
                  </TooltipTrigger>
                  <AccordionContent className="mt-8 max-w-[40ch] px-4">
                    <FormField
                      control={form.control}
                      name="remarks"
                      render={({ field }) => (
                        <FormItem className="space-y-0 py-4">
                          <FormControl>
                            <Textarea
                              {...field}
                              id="remarks"
                              placeholder={`Ireklamo here...`}
                              onInput={(e) => {
                                e.target.value = e.target.value.toUpperCase();
                                field.onChange(e);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button className="mt-4 w-full" onClick={handleSubmit}>
                      Submit 凸( •̀ω•́ )凸
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Draggable>
            <TooltipContent>
              <p>You can drag me (づ๑•ᴗ•๑)づ♡ ूाीू</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Form>
  );
}
