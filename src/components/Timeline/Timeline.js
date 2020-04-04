import React from "react"
import { TimelineElement } from "./TimelineElement"
import styles from "../../styles/timeline.module.css"

const isReactElement = child => typeof child.type !== undefined

export const Timeline = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.timeline} />
      {React.Children.toArray(children).filter(
        child => isReactElement(child) && child.type === TimelineElement
      )}
    </div>
  )
}
