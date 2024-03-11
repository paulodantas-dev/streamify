import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition-opacity">
        <div className="relative rounded-full">
          <Image src="/logo.svg" alt="streamify logo" height="32" width="32" />
        </div>
        <div className={"sr-only lg:not-sr-only"}>
          <p className="text-lg font-semibold">Streamify</p>
          <p className="text-xs text-muted-foreground text-end">.com</p>
        </div>
      </div>
    </Link>
  );
}
