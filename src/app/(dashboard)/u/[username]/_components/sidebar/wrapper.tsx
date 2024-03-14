"use client";

import { cn } from "@/lib/utils";
import { useDashSidebar } from "@/store/use-dash-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  const collapsed = useDashSidebar((state) => state.collapsed);

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
