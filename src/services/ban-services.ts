import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getSelf } from "@/services/auth-services";

export async function isBannedByUser(id: string) {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBan = await db.ban.findUnique({
      where: {
        banisherId_bannedId: {
          banisherId: otherUser.id,
          bannedId: self.id,
        },
      },
    });

    return !!existingBan;
  } catch {
    return false;
  }
}

export async function banUser(id: string) {
  const self = await getSelf();

  if (self.id === id) {
    throw NextResponse.json({ error: "Cannot ban yourself" }, { status: 400 });
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingBan = await db.ban.findUnique({
    where: {
      banisherId_bannedId: {
        banisherId: self.id,
        bannedId: otherUser.id,
      },
    },
  });

  if (existingBan) {
    throw NextResponse.json({ error: "Already banned" }, { status: 400 });
  }

  const ban = await db.ban.create({
    data: {
      banisherId: self.id,
      bannedId: otherUser.id,
    },
    include: {
      banned: true,
    },
  });

  return ban;
}

export async function unbanUser(id: string) {
  const self = await getSelf();

  if (self.id === id) {
    throw NextResponse.json(
      { error: "Cannot unban yourself" },
      { status: 400 }
    );
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingBan = await db.ban.findUnique({
    where: {
      banisherId_bannedId: {
        banisherId: self.id,
        bannedId: otherUser.id,
      },
    },
  });

  if (!existingBan) {
    throw NextResponse.json({ error: "Not banned" }, { status: 400 });
  }

  const unban = await db.ban.delete({
    where: {
      id: existingBan.id,
    },
    include: {
      banned: true,
    },
  });

  return unban;
}

export async function getBannedUsers() {
  const self = await getSelf();

  const bannedUsers = await db.ban.findMany({
    where: {
      banisherId: self.id,
    },
    include: {
      banned: true,
    },
  });

  return bannedUsers;
}
