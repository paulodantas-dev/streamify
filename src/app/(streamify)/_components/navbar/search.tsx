"use client";

import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Search() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[480px] flex items-center bg-background rounded-lg"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none max-w-[220px] md:max-w-[540px] lg:max-w-[400px]"
      />
      {value && (
        <X
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition-opacity"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        variant="ghost"
        className="absolute p-0 h-0 top-1/2 right-5 text-muted-foreground cursor-pointer hover:opacity-75 transition-opacity"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>
    </form>
  );
}
