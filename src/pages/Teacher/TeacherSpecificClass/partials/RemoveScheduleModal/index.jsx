import { Button } from "@/components/ui/button";
import useAddSubjectModal from "./useAddSubjectModal";
import AddSubjectModalForm from "./AddSubjectModalForm";
import { useModal } from "./AddSubjectModal.hooks";
import { Icon } from "@iconify/react";
import { TableCell } from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function RemoveScheduleModal({ subject }) {
  const { isModalOpen, setIsModalOpen } = useModal();

  return (
    <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
      {/* <section className="mb-4 flex gap-4"> */}
      <SheetTrigger asChild>
        <Button size="sm" variant="ghost" className="justify-start px-2">
          Remove schedule
        </Button>
      </SheetTrigger>
      {/* </section> */}

      <SheetContent className="sm:max-h-[100svh] sm:max-w-[525px]">
        <AddSubjectModalForm subject={subject} />
      </SheetContent>
    </Sheet>
  );
}
