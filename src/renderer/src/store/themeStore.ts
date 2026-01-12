import { themeConfig } from "@renderer/utils/theme"
import { create } from "zustand"

type ThemeConfig = {
  primaryColor: string
  secondaryColor: string
  accentColor1: string
  accentColor2: string
}

export type ThemeState = {
  themeName: string
  themeColors: ThemeConfig
}

export type ThemeActions = {
  setTheme: (themeName: string) => void
}

function initialState(): ThemeState {
  return {
    themeName: "cold-night",
    themeColors: themeConfig["cold-night"],
  }
}

export const useThemeStore = create<ThemeState & ThemeActions>((set) => ({
  ...initialState(),
  setTheme: (themeName: string) => set((state) => {
    if (state.themeName !== themeName) {
      return { themeName: themeName, themeColors: themeConfig[themeName] }
    }

    return state
  }),
})) 