"use client";

import { useState } from "react";
import { CheckCheck, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface CopyButtonProps {
  value?: string;
}

export function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const onCopy = () => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    toast({
      variant: "info",
      description: "Copied to clipboard!",
    });
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
