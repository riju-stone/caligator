import { create } from 'zustand'
import { v7 as uuid } from 'uuid'

export const MAX_TABS = 6;

type TabContent = {
  input: string
  output: string
}

type Tab = {
  id: string
  name: string
  content: TabContent
}

export type TabState = {
  tabs: Record<string, Tab>
  activeTabId: string
}

export type TabActions = {
  addTab: () => void
  removeTab: (tabId: string) => void
  setTabs: (tabs: Record<string, Tab>) => void
  setActiveTab: (tabId: string) => void
}

function initialState(): TabState {
  let tabId = uuid()
  return {
    tabs: { [tabId]: { id: tabId, name: 'Tab 1', content: { input: '', output: '' } } },
    activeTabId: tabId
  }
}

export const useTabStore = create<TabState & TabActions>((set) => ({
  ...initialState(),
  addTab: () => set((state) => {
    let newTabId = uuid()
    return {
      tabs: {
        ...state.tabs,
        [newTabId]: { id: newTabId, name: `Tab ${Object.keys(state.tabs).length + 1}`, content: { input: '', output: '' } }
      },
      activeTabId: newTabId
    }
  }),
  removeTab: (tabId: string) => set((state) => {
    let activeTabId = state.activeTabId
    const newTabs = { ...state.tabs }
    delete newTabs[tabId]

    if (state.activeTabId === tabId) {
      const tabArray = Object.values(state.tabs)
      const currentTabIndex = tabArray.findIndex((tab) => tab.id === tabId)

      if (currentTabIndex > 0) {
        activeTabId = tabArray[currentTabIndex - 1].id
      } else if (tabArray.length > 1) {
        activeTabId = tabArray[currentTabIndex + 1].id
      } else {
        activeTabId = ''
      }
    }

    return { tabs: newTabs, activeTabId }
  }),
  setTabs: (tabs: Record<string, Tab>) => set({ tabs: tabs }),
  setActiveTab: (tabId: string) => set({ activeTabId: tabId }),
}))