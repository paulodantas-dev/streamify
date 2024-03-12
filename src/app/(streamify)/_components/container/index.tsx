"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const lgScreen = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  useEffect(() => {
    if (lgScreen) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [lgScreen, onCollapse, onExpand]);

  return (
    <div className={cn("flex-1", collapsed ? "ml-24" : "ml-24 lg:ml-72")}>
      {children}
    </div>
  );
}
