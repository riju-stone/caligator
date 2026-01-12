import { useCallback, useRef, useState } from "react"
import styles from "./app.module.scss"
import InputSectionComponent from "./components/input-section/input-section"
import OutputSectionComponent from "./components/output-section/output-section"
import TabGroupComponent from "./components/tab-group/tab-group"
import FooterComponent from "./components/footer/footer"
import { useThemeStore } from "./store/themeStore"
import PanelComponent from "./components/panel/panel"

function App(): JSX.Element {
  const { themeColors } = useThemeStore()
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const [panelWidth, setPanelWidth] = useState(50)

  const handleDividerMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!contentWrapperRef.current) return

    contentWrapperRef.current.addEventListener("mousemove", handleDividerMouseMove)
    contentWrapperRef.current.addEventListener("mouseup", handleDividerMouseUp)
  }


  const handleDividerMouseMove = useCallback((event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (!contentWrapperRef.current) return

    const containerRect = contentWrapperRef.current.getBoundingClientRect()
    const newWidthInPixels = event.clientX - containerRect.left;
    const newWidthInPercentage = (newWidthInPixels / containerRect.width) * 100;

    // Constrain the width within acceptable bounds (e.g., 10% to 90%)
    if (newWidthInPercentage > 10 && newWidthInPercentage < 90) {
      setPanelWidth(newWidthInPercentage);
    }
  }, [])

  const handleDividerMouseUp = useCallback(() => {
    if (!contentWrapperRef.current) return

    contentWrapperRef.current.removeEventListener("mousemove", handleDividerMouseMove)
    contentWrapperRef.current.removeEventListener("mouseup", handleDividerMouseUp)
  }, [handleDividerMouseMove])


  return (
    <div className={styles.mainWrapper} style={{ backgroundColor: themeColors.primaryColor }} >
      <TabGroupComponent />
      <div className={styles.contentWrapper} ref={contentWrapperRef}>
        <InputSectionComponent panelWidth={panelWidth} />
        <div className={styles.divider} onMouseDown={handleDividerMouseDown} style={{ backgroundColor: themeColors.secondaryColor }} />
        <OutputSectionComponent panelWidth={100 - panelWidth} />
      </div>
      <PanelComponent />
      <FooterComponent />
    </div>
  )
}

export default App
