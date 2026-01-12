import styles from "./styles.module.scss"
import { useTabStore } from '../../store/tabStore'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useThemeStore } from "@renderer/store/themeStore"

type TabComponentProps = {
  id: string
  name: string
  isActive: boolean
}

function TabComponent({ id, name, isActive }: TabComponentProps) {
  const { themeColors } = useThemeStore();
  const { setActiveTab, removeTab } = useTabStore()

  return (
    <motion.div layout="position" className={`${styles.tabWrapper} ${isActive ? styles.activeTab : ''}`} onClick={() => setActiveTab(id)}
      style={{ backgroundColor: isActive ? themeColors.primaryColor : themeColors.secondaryColor }}>
      <div className={styles.tabContent} >
        <span className={styles.tabName}>{name}</span>
        <button className={styles.closeTabButton} onClick={(e) => { e.stopPropagation(); removeTab(id) }}><X color="white" /></button>
      </div>
    </motion.div >
  )
}

export default TabComponent