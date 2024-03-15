"use client";

import { Stream, User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";
import { Video } from "lucide-react";

interface RecommendedProps {
  data: (User & { stream: { isLive: boolean } | null })[];
}

export function Recommended({ data }: RecommendedProps) {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;
  const showIcon = collapsed && data.length > 0;

  return (
    <div className="flex flex-col gap-2">
      {showLabel && (
        <div>
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}

      {showIcon && (
        <div className="w-full flex items-center justify-center">
          <Video className="h-6 w-6" />
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
}

export function RecommendedSkeleton() {
  return (
    <ul className="p-4 flex flex-col gap-2">
      {[...Array(5)].map((_, index) => {
        return <UserItemSkeleton key={index} />;
      })}
    </ul>
  );
}
