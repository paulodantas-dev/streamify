import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  className?: string;
}

export function LiveBadge({ className }: LiveBadgeProps) {
  return (
    <div
      className={cn(
        "bg-emerald-500 text-center p-0.5 px-1.5 rounded-md uppercase text-xs border border-background font-semibold tracking-wide",
        className
      )}
    >
      Live
    </div>
  );
}
