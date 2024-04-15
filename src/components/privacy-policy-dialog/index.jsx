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

export default function PrivacyPolicyDialog({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80svh] overflow-y-scroll sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="">Privacy Policy</DialogTitle>
          <DialogDescription>
            Uncover how we prioritize your privacy.
          </DialogDescription>
          <Separator className="h-[.5px] bg-muted" />
          <p className="py-4 text-sm text-muted-foreground">
            Your privacy is important to us. This Privacy Policy outlines how we
            collect, use, and protect your personal information when you use
            SIMSv1:
          </p>

          <section className="pb-4">
            <h1>Information Collection</h1>
            <Separator className="h-[.5px] bg-muted" />
            <p className="py-2 text-sm text-muted-foreground">
              We collect personal information, such as your name, contact
              details, and academic records, when you enroll through our system.
              This information is necessary for enrollment purposes.
            </p>
          </section>

          <section className="pb-4">
            <h1>Information Usage</h1>
            <Separator className="h-[.5px] bg-muted" />
            <p className="py-2 text-sm text-muted-foreground">
              Your personal information will be used to process your enrollment
              application and for academic and administrative purposes within
              Marciano Del Rosario Memorial National High School.
            </p>
          </section>

          <section className="pb-4">
            <h1>Information Sharing</h1>
            <Separator className="h-[.5px] bg-muted" />
            <p className="py-2 text-sm text-muted-foreground">
              We do not share your personal information with third parties
              except as required by law or with your explicit consent. Your
              information may be shared with school administrators and staff
              solely for academic and administrative purposes.
            </p>
          </section>

          <section className="pb-4">
            <h1>Data Security</h1>
            <Separator className="h-[.5px] bg-muted" />
            <p className="py-2 text-sm text-muted-foreground">
              We implement robust security measures to protect your information
              from unauthorized access, alteration, or disclosure. However,
              while we strive for utmost security, absolute protection cannot be
              guaranteed.
            </p>
          </section>

          <section className="pb-4">
            <h1>Contact Us</h1>
            <Separator className="h-[.5px] bg-muted" />
            <p className="py-2 text-sm text-muted-foreground">
              If you have any questions or concerns about this Privacy Policy or
              our handling of your personal information, please contact us at
              simsadmin@simsv1.com.
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
