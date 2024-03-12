import { getRecommended } from "@/services/recommended-services";

import { Wrapper } from "./wrapper";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Recommended, RecommendedSkeleton } from "./recommended";

export async function Sidebar() {
  const recommended = await getRecommended();

  return (
    <Wrapper>
      <Toggle />
      <div className="p-4">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="fixed left-0 flex flex-col gap-2 w-24 lg:w-72 h-full bg-background border-r border-gray-600 z-10">
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
}
