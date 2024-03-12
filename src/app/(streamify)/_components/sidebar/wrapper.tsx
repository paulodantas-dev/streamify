"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  const isClient = useIsClient();

  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col gap-2 w-24 lg:w-72 h-full bg-gray-800 border-r border-gray-600 z-10">
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 w-72 h-full flex flex-col gap-2 bg-gray-800 border-r border-gray-600 overflow-x-hidden",
        collapsed && "w-24"
      )}
    >
      {children}
    </aside>
  );
}
