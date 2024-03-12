"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Tooltip } from "@/components/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

export function Toggle() {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center p-4 ">
          <Tooltip label={label} side="right" asChild>
            <Button onClick={onExpand} variant="ghost">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>
      )}

      {!collapsed && (
        <div className="flex items-center w-full justify-between p-4">
          <p className="font-semibold text-primary">For you</p>
          <Tooltip label={label} side="right" asChild>
            <Button onClick={onCollapse} variant="ghost">
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>
      )}
    </>
  );
}

export const ToggleSkeleton = () => {
  return (
    <div className="hidden lg:flex items-center justify-between p-4 w-full">
      <Skeleton className="h-6 w-28" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
