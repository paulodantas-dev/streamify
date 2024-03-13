"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/services/auth-services";
import { banUser, unbanUser } from "@/services/ban-services";

// const roomService = new RoomServiceClient(
//   process.env.LIVEKIT_API_URL!,
//   process.env.LIVEKIT_API_KEY!,
//   process.env.LIVEKIT_API_SECRET!,
// );

export async function onBan(id: string) {
  const self = await getSelf();

  let banishedUser;

  try {
    banishedUser = await banUser(id);
  } catch {
    // This means user is a guest
  }

  // try {
  //   await roomService.removeParticipant(self.id, id);
  // } catch {
  //   // This means user is not in the room
  // }

  revalidatePath(`/u/${self.username}/community`);

  return banishedUser;
}

export async function onUnban(id: string) {
  const self = await getSelf();
  const unbanishedUser = await unbanUser(id);

  revalidatePath(`/u/${self.username}/community`);
  return unbanishedUser;
}
