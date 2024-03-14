"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useDashSidebar } from "@/store/use-dash-sidebar";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const { collapsed, onCollapse, onExpand } = useDashSidebar((state) => state);
  const lg = useMediaQuery(`(max-width: 1024px)`);

  useEffect(() => {
    if (lg) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [lg, onCollapse, onExpand]);

  return (
    <div className={cn("flex-1", collapsed ? "ml-24" : "ml-24 lg:ml-72")}>
      {children}
    </div>
  );
}
