import { getSelfByUsername } from "@/services/auth-services";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Container } from "./_components/container";
import { Sidebar } from "./_components/sidebar";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

export default async function DashLayout({
  params,
  children,
}: CreatorLayoutProps) {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar username={self.username} />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}
