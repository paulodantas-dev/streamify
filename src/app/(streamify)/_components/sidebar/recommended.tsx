"use client";

import { User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
  data: User[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div className="flex flex-col gap-2">
      {showLabel && (
        <div className="">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="flex flex-col gap-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="p-4 flex flex-col gap-2">
      {[...Array(5)].map((_, index) => {
        return <UserItemSkeleton key={index} />;
      })}
    </ul>
  );
};
