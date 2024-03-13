import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function getSelf() {
  const self = await currentUser();

  if (!self || !self.username) {
    throw NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  if (!user) {
    throw NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return user;
}

export async function getSelfByUsername(username: string) {
  const self = await currentUser();

  if (!self || !self.username) {
    throw NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (self.username !== user.username) {
    throw NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return user;
}
