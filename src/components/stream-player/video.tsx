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
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  console.log("connectionState1", connectionState);
  console.log("participant1", participant);
  console.log("tracks1", tracks);
  console.log("hostIdentity1", hostIdentity);

  if (connectionState === ConnectionState.Disconnected) {
    content = <OfflineVideo username={hostName} />;
  } else if (
    !participant ||
    tracks.length === 0 ||
    connectionState === ConnectionState.Connecting
  ) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  console.log("connectionState2", connectionState);
  console.log("participant2", participant);
  console.log("tracks2", tracks);
  console.log("hostIdentity2", hostIdentity);

  return <div className="aspect-video border-b group relative">{content}</div>;
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};
