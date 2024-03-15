"use client";

import { Follow, User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";
import { Heart } from "lucide-react";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
}

export function Following({ data }: FollowingProps) {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {!collapsed ? (
        <div>
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <Heart className="h-6 w-6" />
        </div>
      )}
      <ul className="flex flex-col gap-2">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
}

export function FollowingSkeleton() {
  return (
    <ul className="p-4 flex flex-col gap-2">
      {[...Array(5)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
}
