import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function AllTeachersTableSkeleton() {
  return (
    <main className="overflow-hidden px-4">
      <section className="flex justify-between py-4">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-[40vw] sm:w-[30vw]" />
          <Skeleton className="h-8 w-[8vw]" />
          <Skeleton className="h-8 w-[10vw]" />
        </div>

        <div className="flex gap-2">
          {/* <Skeleton className="h-8 w-[5vw]" /> */}
          <Skeleton className="h-8 w-[20vw] sm:w-[8vw]" />
        </div>
      </section>

      <section>
        <Skeleton className="h-[100svh] w-full overflow-hidden" />
      </section>
    </main>
  );
}
