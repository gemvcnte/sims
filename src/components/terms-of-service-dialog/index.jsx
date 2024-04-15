import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function TermsOfServiceDialog({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80svh] overflow-y-scroll sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="">Terms of Service</DialogTitle>
          <DialogDescription>Read our terms and conditions.</DialogDescription>
          <Separator className="h-[.5px] bg-muted" />
          <p className="py-4 text-sm text-muted-foreground">
            By accessing or using SIMSv1, you agree to comply with and be bound
            by the following terms and conditions:
          </p>

          <section className="pb-4">
            <h1>Accuracy of Information</h1>
            <Separator className="h-[.5px] bg-muted" />
            <p className="py-2 text-sm text-muted-foreground">
              You agree to provide accurate and complete information when
              enrolling. Any false or misleading information may result in the
              rejection of your enrollment application.
            </p>
          </section>

          <section className="pb-4">
            <h1>Confidentiality</h1>
            <Separator className="h-[.5px] bg-muted" />
            <p className="py-2 text-sm text-muted-foreground">
              You understand and acknowledge that the information you provide is
              confidential and will only be used for enrollment and academic
              purposes within Marciano Del Rosario Memorial National High
              School.
            </p>
          </section>

          <section className="pb-4">
            <h1>Security</h1>
            <Separator className="h-[.5px] bg-muted" />
            <p className="py-2 text-sm text-muted-foreground">
              You are responsible for maintaining the security of your login
              credentials. Any unauthorized use of your account must be reported
              immediately.
            </p>
          </section>

          <section className="pb-4">
            <h1>Acceptable Use</h1>
            <Separator className="h-[.5px] bg-muted" />
            <p className="py-2 text-sm text-muted-foreground">
              You agree to use our system in accordance with all applicable laws
              and regulations and in a manner that does not infringe upon the
              rights of others or disrupt the functioning of the system.
            </p>
          </section>

          <section className="pb-4">
            <h1>Modifications</h1>
            <Separator className="h-[.5px] bg-muted" />
            <p className="py-2 text-sm text-muted-foreground">
              We reserve the right to update these Terms of Service
              periodically, and your continued use of our system after any
              changes indicates your acceptance of the modified terms.
            </p>
          </section>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline" size="lg" className="">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
