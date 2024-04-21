import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

export function DefaultPasswordInfoPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <Button variant="icon" className="p-0"> */}
        <Info className="text-[#9FA9B9] hover:cursor-pointer" />
        {/* </Button> */}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Default Password</h4>
            <p className="text-sm text-muted-foreground">
              Hey there! Just so you know, your default password is your birth
              date in the format YYYY-MM-DD. For instance, if you were born on
              January 15, 2002, your default password would be "2002-01-15".
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
