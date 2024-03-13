"use client";

import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { onUnban } from "@/actions/ban";

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

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onUnban(userId)
        .then((data) =>
          toast({
            variant: "success",
            description: `Unblocked the user ${data.banned.username}`,
          })
        )
        .catch(() =>
          toast({ variant: "destructive", description: "Something went wrong" })
        );
    });
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="default">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        Block
      </Button>
    </>
  );
}
