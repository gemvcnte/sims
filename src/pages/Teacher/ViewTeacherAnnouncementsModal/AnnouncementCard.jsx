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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteAnnouncementApi } from "./helpers/deleteAnnouncementApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAnnouncementsContext } from "@/pages/Admin/AdminDashboard/hooks/useAnnouncements";

const AnnouncementCard = ({ announcement }) => {
  const { refetchAnnouncements } = useAnnouncementsContext();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
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

  const deleteAnnouncement = async (event) => {
    event.preventDefault();

    try {
      await deleteAnnouncementApi(announcement._id);

      refetchAnnouncements();
      setIsDeleteAlertOpen(false);
    } catch (error) {
      console.error("Error handling submit:", error);
    }
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="-mr-2 h-8 w-8"
                  >
                    <MoreVertical className="h-3.5 w-3.5 " />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Dialog
                    open={isUpdateModalOpen}
                    onOpenChange={setIsUpdateModalOpen}
                  >
                    <DialogTrigger className="w-full">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-full justify-start px-2"
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <UpdateAnnouncementModal
                      announcement={announcement}
                      onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
                    />
                  </Dialog>
                  <AlertDialog
                    open={isDeleteAlertOpen}
                    onOpenChange={setIsDeleteAlertOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-full justify-start px-2"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the announcement and remove the data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteAnnouncement}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
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

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default AnnouncementCard;
