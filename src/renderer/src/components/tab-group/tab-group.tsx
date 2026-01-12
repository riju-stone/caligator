import { PlusCircleIcon } from "lucide-react"
import styles from "./styles.module.scss"
import { AnimatePresence, motion, Reorder } from 'framer-motion'
import TabComponent from '../tab/tab'
import { useTabStore } from '../../store/tabStore'
import { useThemeStore } from "../../store/themeStore"

function TabGroupComponent() {
  const { tabs, addTab, setTabs, activeTabId } = useTabStore()
  const { themeColors } = useThemeStore()

  return (
    <div className={styles.tabGroupWrapper} style={{ backgroundColor: themeColors.secondaryColor }} >
      <Reorder.Group as="div" axis="x" values={Object.keys(tabs)} onReorder={(newOrder) => setTabs(newOrder.reduce((acc, tabId) => {
        return { ...acc, [tabId]: { id: tabs[tabId].id, name: tabs[tabId].name, isActive: newOrder.indexOf(tabId) === 0 } }
      }, {} as Record<string, { id: string, name: string, isActive: boolean }>))} className={styles.tabGroupContent} >
        <AnimatePresence>
          {Object.keys(tabs).map((tabId) => (
            <motion.div key={tabId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.125, delay: 0.25 }}>
              <Reorder.Item className={styles.tabItem} as="div" value={tabId} key={tabId} style={{ zIndex: 99 }}>
                <TabComponent id={tabId} name={tabs[tabId].name} isActive={tabs[tabId].id === activeTabId} />
              </Reorder.Item>
            </motion.div>

          ))}
          <motion.button layout="position" className={styles.addTabButton} onClick={() => addTab()}>
            <PlusCircleIcon color="white" />
          </motion.button>
        </AnimatePresence>
      </Reorder.Group>
    </div >
  )
}

export default TabGroupComponent