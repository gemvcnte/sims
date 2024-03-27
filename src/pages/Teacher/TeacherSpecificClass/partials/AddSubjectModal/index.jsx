import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import useAddSubjectModal from "./useAddSubjectModal";
import AddSubjectModalForm from "./AddSubjectModalForm";

export default function AddSubjectModal() {
  const { isModalOpen, setIsModalOpen } = useAddSubjectModal();

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <section className="mb-4 flex gap-4">
        <DialogTrigger asChild>
          <Button variant="outline">Add Subject</Button>
        </DialogTrigger>
      </section>

      <DialogContent className="sm:max-h-[90svh] sm:max-w-[525px]">
        <AddSubjectModalForm />
      </DialogContent>
    </Dialog>
  );
}
