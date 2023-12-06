import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SectionCard({ sectionName, adviser, totalStudents }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span className="uppercase">{sectionName}</span>
          <span className="hidden text-lg font-normal text-muted-foreground sm:block">
            {totalStudents} Students
          </span>
        </CardTitle>
        <CardDescription>
          <span className="sm:hidden">{totalStudents} Students</span>
          <br />
          View this section by clicking this card.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center sm:space-x-4">
            <Avatar className="hidden sm:block">
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{adviser}</p>
              <p className="text-sm text-muted-foreground">adviser</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Edit{" "}
                {/* <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" /> */}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandInput placeholder="Select new role..." />
                <CommandList>
                  <CommandEmpty>No roles found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Viewer</p>
                      <p className="text-sm text-muted-foreground">
                        Can view and comment.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Developer</p>
                      <p className="text-sm text-muted-foreground">
                        Can view, comment and edit.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Billing</p>
                      <p className="text-sm text-muted-foreground">
                        Can view, comment and manage billing.
                      </p>
                    </CommandItem>
                    <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>Owner</p>
                      <p className="text-sm text-muted-foreground">
                        Admin-level access to all resources.
                      </p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
