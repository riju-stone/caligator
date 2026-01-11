import React from 'react'
import styles from "./styles.module.scss"

function OutputSectionComponent({ panelWidth }: { panelWidth: number }) {
  return (
    <div className={styles.outputSectionWrapper} style={{ flexBasis: `${panelWidth}%` }}>OutputSectionComponent</div>
  )
}

export default OutputSectionComponent