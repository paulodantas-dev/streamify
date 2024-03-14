"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashSidebar } from "@/store/use-dash-sidebar";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

export const NavItem = ({
  icon: Icon,
  label,
  href,
  isActive,
}: NavItemProps) => {
  const collapsed = useDashSidebar((state) => state.collapsed);

  return (
    <Link
      href={href}
      className={cn(
        "w-full flex items-center gap-x-4 p-2",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <div className="flex items-center gap-x-4">
        <Icon className="h-6 w-6" />
        {!collapsed && <span>{label}</span>}
      </div>
    </Link>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 p-2">
      <Skeleton className="h-8 w-8 rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
