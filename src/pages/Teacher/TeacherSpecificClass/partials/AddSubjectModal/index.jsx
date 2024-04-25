import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import useAddSubjectModal from "./useAddSubjectModal";
import AddSubjectModalForm from "./AddSubjectModalForm";
import { useModal } from "./AddSubjectModal.hooks";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function AddSubjectModal() {
  const { isModalOpen, setIsModalOpen } = useModal();

  return (
    <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
      <section className="mb-4 flex gap-4">
        <DialogTrigger asChild>
          <Button variant="outline">Add Subject</Button>
        </DialogTrigger>
      </section>

      <SheetContent className="sm:max-h-[100svh] sm:max-w-[525px]">
        <AddSubjectModalForm />
      </SheetContent>
    </Sheet>
  );
}
