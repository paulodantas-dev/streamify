"use client";

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}

export function ToggleCard({ label, value = false, field }: ToggleCardProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() =>
          toast({
            variant: "success",
            description: "Chat settings updated!",
          })
        )
        .catch(() =>
          toast({
            variant: "destructive",
            description: "Failed to update chat settings",
          })
        );
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>

        <Switch disabled={isPending} onCheckedChange={onChange} checked={value}>
          {value ? "On" : "Off"}
        </Switch>
      </div>
    </div>
  );
}

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
