import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export async function Actions() {
  const user = await currentUser();

  return (
    <div className="flex items-center gap-x-2">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="default" className="px-1 lg:px-3">
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Link
            href={`/u/${user.username}`}
            className="flex items-center gap-x-2 text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <Clapperboard className="h-5 w-5" />
            <span className="sr-only lg:not-sr-only">Dashboard</span>
          </Link>

          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
}
