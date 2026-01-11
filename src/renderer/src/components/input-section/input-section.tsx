import React from 'react'
import styles from "./styles.module.scss"

function InputSectionComponent({ panelWidth }: { panelWidth: number }) {
  return (
    <div className={styles.inputSectionWrapper} style={{ flexBasis: `${panelWidth}%` }}>InputSectionComponent</div>
  )
}

export default InputSectionComponent