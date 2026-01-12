import styles from "./styles.module.scss"
import { useThemeStore } from "@renderer/store/themeStore"
import { AnimatePresence, motion } from "framer-motion"
import { useAppStore } from "../../store/appStore"
import { themeConfig } from "@renderer/utils/theme"

function PanelComponent() {
  const { themeName, themeColors, setTheme } = useThemeStore()
  const { panelOpen } = useAppStore()


  const handleThemeChange = (value) => {
    console.log(value)
    setTheme(value)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={panelOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.125, delay: 0.25 }}
        className={styles.panelWrapper} style={{ backgroundColor: themeColors.secondaryColor }}>
        <div className={styles.panelContent}>
          <label>Theme</label>
          <select value={themeName} onChange={(e) => handleThemeChange(e.target.value)}>
            {Object.keys(themeConfig).map((theme) => (
              <option key={theme} value={theme}
              >{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
            ))}
          </select>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PanelComponent