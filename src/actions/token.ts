"use server";

import { AccessToken } from "livekit-server-sdk";
import { NextResponse } from "next/server";
import crypto from "crypto";

import { getSelf } from "@/services/auth-services";
import { isBanishedByUser } from "@/services/ban-services";
import { getUserById } from "@/services/user-services";

export async function createViewerToken(hostIdentity: string) {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = crypto.randomBytes(16).toString("hex");
    const username = `guest#${crypto.randomBytes(16).toString("hex")}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw NextResponse.json({ message: "Host not found" }, { status: 404 });
  }

  const isBanished = await isBanishedByUser(host.id);

  if (isBanished) {
    throw NextResponse.json({ message: "User is banished" }, { status: 403 });
  }

  const isHost = self.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  const jwt = await token.toJwt();

  return jwt;
}
