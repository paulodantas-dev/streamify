import { currentUser } from "@clerk/nextjs";

import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/services/user-services";
import { NextResponse } from "next/server";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
}
