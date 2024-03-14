import { notFound } from "next/navigation";
import { getSelf } from "@/services/auth-services";

import { getStreamByUserId } from "@/services/stream-services";
import { ToggleCard } from "./_components/toggle-card";

export default async function ChatPage() {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    notFound();
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Chat settings</h1>

      <div className="flex flex-col gap-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Follow to chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}
