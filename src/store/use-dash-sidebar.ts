import { create } from "zustand";

interface DashSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useDashSidebar = create<DashSidebarStore>((set) => ({
  collapsed: true,
  onExpand: () =>
    set(() => {
      return { collapsed: false };
    }),
  onCollapse: () =>
    set(() => {
      return { collapsed: true };
    }),
}));
