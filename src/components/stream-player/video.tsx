"use client";

import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { Skeleton } from "../ui/skeleton";

import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { OfflineVideo } from "./offline-video";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

export const Video = ({ hostName, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => {
    return track.participant.identity === hostIdentity;
  });

  console.log({ connectionState, participant, tracks }, "Video");

  let content;

  if (connectionState === ConnectionState.Disconnected) {
    content = <OfflineVideo username={hostName} />;
  } else if (
    !participant ||
    tracks.length === 0 ||
    connectionState === ConnectionState.Connecting ||
    connectionState === ConnectionState.Reconnecting
  ) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  console.log({ connectionState, participant, tracks, content }, "Video");

  return <div className="aspect-video border-b group relative">{content}</div>;
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};
