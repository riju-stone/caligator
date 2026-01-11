import { create } from 'zustand'
import { v7 as uuid } from 'uuid'

export const MAX_TABS = 6;

type Tab = {
  id: string
  name: string
  icon: string
  isActive: boolean
}

export type TabState = {
  tabs: Array<Tab>
}

export type TabActions = {
  addTab: (name: string, icon: string) => void
  removeTab: (tabId: string) => void
  updateTab: (tabId: string, name: string, icon: string) => void
  setTabs: (tabs: Array<Tab>) => void
  setActiveTab: (tabId: string) => void
}

// There should be atleast one tab
const initialState: TabState = {
  tabs: [{ id: uuid(), name: 'Tab 1', icon: 'icon1', isActive: true }],
}

export const useTabStore = create<TabState & TabActions>((set) => ({
  ...initialState,
  addTab: (name: string, icon: string) => set((state) => ({
    // Set the new tab as active and all
    tabs: state.tabs.length >= MAX_TABS ? state.tabs : [...state.tabs, { id: uuid(), name, icon, isActive: false }]
  })),
  removeTab: (tabId: string) => set((state) => ({ tabs: state.tabs.length === 1 ? state.tabs : state.tabs.filter((tab) => tab.id !== tabId) })),
  updateTab: (tabId: string, name: string, icon: string) => set((state) => ({ tabs: state.tabs.map((tab) => tab.id === tabId ? { ...tab, name, icon } : tab) })),
  setTabs: (tabs: Array<Tab>) => set({ tabs }),
  setActiveTab: (tabId: string) => set((state) => ({ tabs: state.tabs.map((tab) => tab.id === tabId ? { ...tab, isActive: true } : { ...tab, isActive: false }) })),
})) 