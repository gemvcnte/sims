import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import useAddSubjectModal from "./useAddSubjectModal";
import AddSubjectModalForm from "./AddSubjectModalForm";
import { useModal } from "./AddSubjectModal.hooks";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useClassDetails } from "../../contexts/ClassDetailsContext";

export default function AddSubjectModal() {
  const { isModalOpen, setIsModalOpen } = useModal();
  const classDetailsContext = useClassDetails();
  const { isOnCurrentSemester } = classDetailsContext;

  return (
    <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
      <section className="mb-4 flex gap-4">
        <DialogTrigger asChild>
          <Button variant="outline" disabled={!isOnCurrentSemester}>
            Add Subject
          </Button>
        </DialogTrigger>
      </section>

      <SheetContent className="sm:max-h-[100svh] sm:max-w-[525px]">
        <AddSubjectModalForm />
      </SheetContent>
    </Sheet>
  );
}
