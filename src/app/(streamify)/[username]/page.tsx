import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isFollowingUser } from "@/services/follow-services";
import { isBanishedByUser } from "@/services/ban-services";
import { getUserByUsername } from "@/services/user-services";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBanished = await isBanishedByUser(user.id);

  if (isBanished) {
    notFound();
  }

  return <Actions isFollowing={isFollowing} userId={user.id} />;
}
