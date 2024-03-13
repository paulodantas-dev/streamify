"use client";

import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { onBan, onUnban } from "@/actions/ban";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export function Actions({ isFollowing, userId }: ActionsProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast({
            variant: "success",
            description: `You are now following ${data.following.username}`,
          })
        )
        .catch(() =>
          toast({ variant: "destructive", description: "Something went wrong" })
        );
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast({
            variant: "success",
            description: `You have unfollowed ${data.following.username}`,
          })
        )
        .catch(() =>
          toast({ variant: "destructive", description: "Something went wrong" })
        );
    });
  };

  const onClickFollow = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBan = () => {
    startTransition(() => {
      onBan(userId)
        .then((data) =>
          toast({
            variant: "success",
            description: `Ban the user ${data?.banished.username}`,
          })
        )
        .catch(() =>
          toast({ variant: "destructive", description: "Something went wrong" })
        );
    });
  };

  const handleUnban = () => {
    startTransition(() => {
      onUnban(userId)
        .then((data) =>
          toast({
            variant: "success",
            description: `Unban the user ${data.banished.username}`,
          })
        )
        .catch(() =>
          toast({ variant: "destructive", description: "Something went wrong" })
        );
    });
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Button disabled={isPending} onClick={onClickFollow} variant="default">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleUnban} disabled={isPending}>
        asdasd
      </Button>
    </div>
  );
}
