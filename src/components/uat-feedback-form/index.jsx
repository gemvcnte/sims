import React from "react";
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

export default function UatFeedbackForm() {
  const isOnUatEnvironment = import.meta.env.VITE_ENVIRONMENT === "uat";

  if (!isOnUatEnvironment) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    ShowSuccessNotification("Thank you for your feedback! ৻(  •̀ ᗜ •́  ৻)");
  };

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Draggable>
    //       <div className="absolute  z-[1000]">
    //         <img src={master} alt="" className="w-16 rounded-full" />
    //         <p>REPORT ISSUE TO MASTER BOB</p>
    //       </div>
    //     </Draggable>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="w-56">
    //     <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //   </DropdownMenuContent>
    // </DropdownMenu>

    <div className="z-[99999999999999999] overflow-visible p-8">
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
                  <AccordionTrigger className="rounded-md p-4">
                    <div className="absolute right-0 top-0 z-[99999999999999999999999999999999999999999999] flex p-2">
                      <img src={master} alt="" className="w-12 rounded-full" />
                      <p>REPORT ISSUE TO SENPAI BOB 🗿</p>
                    </div>
                  </AccordionTrigger>
                </TooltipTrigger>
                <AccordionContent className="mt-8 max-w-[40ch] px-4">
                  <Textarea placeholder="Ireklamo here..." />
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
  );
}
