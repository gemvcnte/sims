import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateAnnouncementModal from "./UpdateAnnouncementModal";
import { useAuth } from "@/contexts/AuthContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnnouncementCard = ({
  announcement,
  expandedAnnouncement,
  toggleContent,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false); // State to track accordion open/closed
  const { user } = useAuth();

  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);
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
          <div>
            {user.role === "teacher" &&
            announcement.isPublic === true ? null : (
              <Dialog
                open={isUpdateModalOpen}
                onOpenChange={setIsUpdateModalOpen}
              >
                <DialogTrigger>
                  <Button variant="ghost" className="p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <UpdateAnnouncementModal
                  announcement={announcement}
                  onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
                />
              </Dialog>
            )}
          </div>
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
            <AccordionContent className="break-all">
              {announcement.content}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default AnnouncementCard;
