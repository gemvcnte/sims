import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import useAddSubjectModal from "./useAddSubjectModal";
import AddSubjectModalForm from "./AddSubjectModalForm";
import { useModal } from "./AddSubjectModal.hooks";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useClassDetails } from "../../contexts/ClassDetailsContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AddSubjectModal() {
  const { isModalOpen, setIsModalOpen } = useModal();
  const classDetailsContext = useClassDetails();
  const { isOnCurrentSemester } = classDetailsContext;

  return (
    <TooltipProvider delayDuration={10}>
      <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
        <section className="mb-4 flex gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <div>
                  <Button variant="outline" disabled={!isOnCurrentSemester}>
                    Add Subject
                  </Button>
                </div>
              </DialogTrigger>
            </TooltipTrigger>
            {!isOnCurrentSemester ? (
              <TooltipContent>
                <p className="max-w-[80ch]">
                  Oops! It looks like you're trying to add a subject, but the
                  class is currently in a previous semester. No worries, though!
                  If you need further assistance, feel free to reach out to the
                  administrator for support.
                </p>
              </TooltipContent>
            ) : null}
          </Tooltip>
        </section>

        <SheetContent className="sm:max-h-[100svh] sm:max-w-[525px]">
          <AddSubjectModalForm />
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
