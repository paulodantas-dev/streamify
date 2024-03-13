"use server";

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { followUser, unfollowUser } from "@/services/follow-services";

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    throw NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    throw NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
};
