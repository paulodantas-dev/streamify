import { Skeleton } from "@/components/ui/skeleton";

import { ToggleCardSkeleton } from "./_components/toggle-card";

export default function ChatLoading() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <Skeleton className="h-10 w-full" />
      <div className="flex flex-col gap-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  );
}
