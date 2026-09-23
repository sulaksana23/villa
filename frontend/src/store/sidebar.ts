import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SidebarState {
  isOpen: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
}

export const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: true,
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      setOpen: (open) => set({ isOpen: open }),
    }),
    { name: "villa-sidebar", partialize: (s) => ({ isOpen: s.isOpen }) }
  )
)