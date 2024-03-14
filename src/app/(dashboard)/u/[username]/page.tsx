import { getUserByUsername } from "@/services/user-services";
import { currentUser } from "@clerk/nextjs";

interface DashPageProps {
  params: {
    username: string;
  };
}

export default async function DashPage({ params }: DashPageProps) {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  return <div className="h-full">xd</div>;
}
