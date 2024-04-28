import { Button } from "@/components/ui/button";
import AddSubjectModalForm from "./AddSubjectModalForm";
import { useModal } from "./AddSubjectModal.hooks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AddScheduleModal({ subject }) {
  const { isModalOpen, setIsModalOpen } = useModal();

  return (
    <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
      <SheetTrigger asChild>
        {/* <TableCell className="inline-block hover:cursor-pointer"> */}
        {/* <span className="flex items-center gap-2">
            <span className="border-b border-background py-1 hover:border-foreground">
              Update
            </span>
            <Icon
              icon="octicon:arrow-down-24"
              rotate={3}
              className="ml-2 hidden -rotate-45 transform transition-all group-hover:rotate-45 sm:inline"
            />
          </span> */}
        {/* </TableCell> */}

        <Button size="sm" variant="ghost" className="justify-start px-2">
          Update schedule
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-h-[100svh] sm:max-w-[525px]">
        <AddSubjectModalForm subject={subject} />
      </SheetContent>
    </Sheet>
  );
}
