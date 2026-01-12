import { create } from "zustand"

export type AppState = {
  panelOpen: boolean
}

export type AppActions = {
  togglePanel: () => void
}

function setInitialAppState(): AppState {
  return {
    panelOpen: false,
  }
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  ...setInitialAppState(),
  togglePanel: () => set((state) => ({ panelOpen: !state.panelOpen }))
}))