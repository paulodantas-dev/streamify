import { notFound } from "next/navigation";
import { Actions } from "./actions";
import { isFollowingUser } from "@/services/follow-services";
import { isBannedByUser } from "@/services/ban-services";
import { getUserByUsername } from "@/services/user-services";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);
  console.log(user, "---------");
  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBanned = await isBannedByUser(user.id);

  if (isBanned) {
    notFound();
  }

  return <Actions isFollowing={isFollowing} userId={user.id} />;
}
