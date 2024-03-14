import { getSelf } from "@/services/auth-services";
import { getStreamByUserId } from "@/services/stream-services";
import { notFound } from "next/navigation";
import { ConnectModal } from "./_components/connect-modal";
import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";

export default async function KeysPage() {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    notFound();
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="flex flex-col gap-10">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
}
