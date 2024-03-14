import { Input } from "@/components/ui/input";

import { CopyButton } from "./copy-button";

interface UrlCardProps {
  value: string | null;
}

export const UrlCard = ({ value }: UrlCardProps) => {
  return (
    <div className="rounded-xl bg-muted p-4 flex items-center gap-2">
      <p className="font-semibold shrink-0">Server URL</p>

      <div className="w-full flex items-center">
        <Input value={value || ""} disabled placeholder="Server URL" />
        <CopyButton value={value || ""} />
      </div>
    </div>
  );
};
