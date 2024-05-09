import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AnnouncementCard = ({ announcement }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 333);
  };

  useEffect(() => {
    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  const [showFullTitle, setShowFullTitle] = useState(false);

  const toggleTitle = () => {
    setShowFullTitle(!showFullTitle);
  };

  return (
    <div key={announcement._id} className="mb-4 rounded-lg border p-4">
      <div className="flex flex-col break-all">
        <section className=" flex items-center justify-between gap-4">
          {isMobile ? (
            <h2 className="break-all font-semibold">
              {showFullTitle ? (
                announcement.title
              ) : (
                <>
                  {announcement.title.length > 20
                    ? `${announcement.title.substring(0, 20)}...`
                    : announcement.title}
                  {announcement.title.length > 20 && (
                    <button
                      className="text-xs italic text-muted-foreground hover:underline sm:ml-2"
                      onClick={toggleTitle}
                    >
                      Show Full Title
                    </button>
                  )}
                </>
              )}
            </h2>
          ) : (
            <h2 className="break-all font-semibold">{announcement.title}</h2>
          )}
          <div></div>
        </section>
        <p className="text-xs text-muted-foreground">
          {new Date(announcement.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <section className="flex items-baseline justify-between text-xs">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger onClick={toggleAccordion}>
              {accordionOpen ? "Hide Details" : "Show Details"}{" "}
            </AccordionTrigger>
            <AccordionContent className="break-word overflow-auto">
              {announcement.content}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default AnnouncementCard;
