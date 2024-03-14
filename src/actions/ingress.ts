"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
  TrackSource,
} from "livekit-server-sdk";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSelf } from "@/services/auth-services";
import { NextResponse } from "next/server";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const livekitHost = process.env.LIVEKIT_API_URL!;
const ingressClient = new IngressClient(
  livekitHost,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function resetIngresses(hostIdentity: string) {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });
  const rooms = await roomService.listRooms([hostIdentity]);
  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }
  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
}

export async function createIngress(ingressType: IngressInput) {
  const self = await getSelf();

  await resetIngresses(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      encodingOptions: {
        case: "preset",
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      },
    } as any;
    options.audio = {
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        case: "preset",
      },
    } as any;
  }

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw NextResponse.json(
      { error: "Failed to create ingress" },
      { status: 500 }
    );
  }
  await db.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });
  revalidatePath(`/u/${self.username}/keys`);
  return ingress;
}
