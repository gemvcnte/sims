import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function AdminScheduleSkeleton() {
  return (
    <main className="p-4">
      <Skeleton className="h-16"></Skeleton>
      <section className="mt-1 flex flex-col gap-1">
        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>

        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>

        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>

        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>

        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>
        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>
        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>
        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>
        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>
        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>
        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>
        <div className="flex w-full gap-1">
          <Skeleton className="h-8 w-1/4"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
        </div>
      </section>
    </main>
  );
}
