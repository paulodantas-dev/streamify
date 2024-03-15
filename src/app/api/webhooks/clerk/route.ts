import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { db } from "@/lib/db";
// import { resetIngresses } from "@/actions/ingress";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      {
        error:
          "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
      },
      { status: 400 }
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Error occured -- no svix headers" },
      { status: 400 }
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return NextResponse.json(
      { error: "Error occured -- could not verify webhook" },
      { status: 400 }
    );
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
        stream: {
          create: {
            name: `${payload.data.username}'s stream`,
          },
        },
      },
    });
  }

  if (eventType === "user.updated") {
    await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }

  if (eventType === "user.deleted") {
    // await resetIngresses(payload.data.id);

    await db.user.delete({
      where: {
        externalUserId: payload.data.id,
      },
    });
  }

  return NextResponse.json(null, { status: 200 });
}
