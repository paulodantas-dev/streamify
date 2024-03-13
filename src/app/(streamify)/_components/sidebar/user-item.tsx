"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { LiveBadge } from "@/components/live-badge";
import { Tooltip } from "@/components/tooltip";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export function UserItem({ username, imageUrl, isLive }: UserItemProps) {
  const pathname = usePathname();

  const { collapsed } = useSidebar((state) => state);

  const href = `/${username}`;
  const isActive = pathname === href;
  const showBadge = collapsed && isLive;

  return (
    <Link
      href={href}
      className={cn(
        "w-full h-12 p-2",
        collapsed ? "justify-center" : "justfy-start",
        isActive && "bg-accent"
      )}
    >
      <div
        className={cn(
          "flex items-center w-full gap-x-4",
          collapsed && "justify-center"
        )}
      >
        <UserAvatar
          imageUrl={imageUrl}
          username={username}
          isLive={isLive}
          showBadge={showBadge}
        />
        {!collapsed && <p className="flex-1 truncate">{username}</p>}
        {!collapsed && isLive && <LiveBadge />}
      </div>
    </Link>
  );
}

export function UserItemSkeleton() {
  return (
    <li className="flex items-center justify-center gap-x-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="hidden lg:block flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
}
