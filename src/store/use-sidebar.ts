import { create } from "zustand";

interface SidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
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
