import React from 'react'

import styles from "./styles.module.scss"
import { useTabStore } from '../../store/tabStore'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

type TabComponentProps = {
  id: string
  name: string
  icon: string
  isActive: boolean
}

function TabComponent({ id, name, icon, isActive }: TabComponentProps) {
  const { setActiveTab, removeTab } = useTabStore()

  return (
    <motion.div layout="position" className={`${styles.tabWrapper} ${isActive ? styles.activeTab : ''}`} onClick={() => setActiveTab(id)} >
      <div className={styles.tabContent} >
        {/* <img src={icon} alt={name} />  */}
        <span className={styles.tabName}>{name}</span>
        <button className={styles.closeTabButton} onClick={() => removeTab(id)}><X color="white" /></button>
      </div>
    </motion.div >
  )
}

export default TabComponent