import styles from "./styles.module.scss"
import { Bolt, SwatchBook } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'
import { useAppStore } from '../../store/appStore'

function FooterComponent() {
  const { themeColors } = useThemeStore()
  const { togglePanel } = useAppStore()
  return (
    <div className={styles.footerWrapper} style={{ backgroundColor: themeColors.secondaryColor }} >
      <div className={styles.footerContent} >
        <div className={styles.footerLeftWrapper}>
        </div>
        <div className={styles.footerRightWrapper}>
          <button className={styles.footerButton} style={{ backgroundColor: themeColors.primaryColor }}
            onClick={() => togglePanel()}>
            <Bolt color="white" size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FooterComponent