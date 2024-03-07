import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function AllStudentsTableSkeleton() {
  return (
    <main className="overflow-hidden px-4">
      <section className="flex justify-between py-4">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-[30vw]" />
          <Skeleton className="h-8 w-[6vw]" />
          <Skeleton className="h-8 w-[4vw]" />
        </div>

        <div className="flex gap-2">
          {/* <Skeleton className="h-8 w-[5vw]" /> */}
          <Skeleton className="h-8 w-[8vw]" />
        </div>
      </section>

      <section>
        <Skeleton className="h-[100svh] w-full overflow-hidden" />
      </section>
    </main>
  );
}
