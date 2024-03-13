import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getSelf } from "@/services/auth-services";

export async function getFollowedUsers() {
  try {
    const self = await getSelf();

    const followedUsers = db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          banished: {
            none: {
              banisherId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          following: {
            stream: {
              isLive: "desc",
            },
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return followedUsers;
  } catch {
    return [];
  }
}

export async function isFollowingUser(id: string) {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
}

export async function followUser(id: string) {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (otherUser.id === self.id) {
    throw NextResponse.json(
      { error: "Cannot follow yourself" },
      { status: 400 }
    );
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw NextResponse.json({ error: "Already following" }, { status: 400 });
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
}

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (otherUser.id === self.id) {
    throw NextResponse.json(
      { error: "Cannot unfollow yourself" },
      { status: 400 }
    );
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw NextResponse.json({ error: "Not following" }, { status: 400 });
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};
