"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

export function Actions() {
  const { user } = useUser();

  if (!user?.username) {
    return <AvatarSkeleton />;
  }

  return (
    <div className="flex items-center justify-end gap-x-4">
      <Link
        href="/"
        className="flex items-center gap-x-2 text-sm text-muted-foreground hover:text-primary"
      >
        <LogOut className="h-4 w-4" />
        Exit
      </Link>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export function AvatarSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}
