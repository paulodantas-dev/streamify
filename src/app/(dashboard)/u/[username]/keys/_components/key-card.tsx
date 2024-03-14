"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CopyButton } from "./copy-button";

interface KeyCardProps {
  value: string | null;
}

export function KeyCard({ value }: KeyCardProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-4 flex flex-col gap-2 ">
      <div className="w-full flex items-center gap-2">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="w-full flex items-center gap-2">
          <Input
            value={value || ""}
            type={show ? "text" : "password"}
            disabled
            placeholder="Stream key"
          />
          <CopyButton value={value || ""} />
        </div>
      </div>
      <Button
        disabled={!value}
        onClick={() => {
          setShow(!show);
        }}
        size="sm"
        variant="link"
      >
        {show ? "Hide" : "Show"}
      </Button>
    </div>
  );
}
