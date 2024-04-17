import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import useAddSubjectModal from "./useAddSubjectModal";
import AddSubjectModalForm from "./AddSubjectModalForm";
import { useModal } from "./AddSubjectModal.hooks";
import { Icon } from "@iconify/react";
import { TableCell } from "@/components/ui/table";

export default function RemoveScheduleModal({ subject }) {
  const { isModalOpen, setIsModalOpen } = useModal();

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      {/* <section className="mb-4 flex gap-4"> */}
      <DialogTrigger asChild>
        <TableCell className="inline-block hover:cursor-pointer">
          <span className="flex items-center gap-2">
            <span className="border-b border-background py-1 hover:border-foreground">
              Remove schedule
            </span>
            <Icon
              icon="octicon:arrow-down-24"
              rotate={3}
              className="ml-2 hidden -rotate-45 transform transition-all group-hover:rotate-45 sm:inline"
            />
          </span>
        </TableCell>
      </DialogTrigger>
      {/* </section> */}

      <DialogContent className="sm:max-h-[90svh] sm:max-w-[525px]">
        <AddSubjectModalForm subject={subject} />
      </DialogContent>
    </Dialog>
  );
}
