import { Suspense } from "react";

import { Navbar } from "./_components/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-20">{children}</div>
    </>
  );
}
