import { Plus } from "lucide-react"
import styles from "./styles.module.scss"
import { AnimatePresence, motion, Reorder } from 'framer-motion'
import TabComponent from '../tab/tab'
import { useTabStore } from '../../store/tabStore'

function TabGroupComponent() {
  const { tabs, addTab, setTabs } = useTabStore()

  return (
    <div className={styles.tabGroupWrapper} >
      <Reorder.Group as="div" axis="x" values={tabs} onReorder={setTabs} className={styles.tabGroupContent} >
        <AnimatePresence>
          {tabs.map((tab) => (
            <motion.div key={tab.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.125, delay: 0.25 }}>
              <Reorder.Item as="div" value={tab} key={tab.id}>
                <TabComponent id={tab.id} name={tab.name} icon={tab.icon} isActive={tab.isActive} />
              </Reorder.Item>
            </motion.div>

          ))}
          <motion.button layout="position" className={styles.addTabButton} onClick={() => addTab(`Tab ${tabs.length + 1}`, 'icon2')}>
            <Plus color="white" size={20} />
          </motion.button>
        </AnimatePresence>
      </Reorder.Group>
    </div >
  )
}

export default TabGroupComponent