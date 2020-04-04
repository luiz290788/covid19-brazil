import React from "react"
import styles from "../../styles/timeline.module.css"

export const TimelineElement = ({ children }) => {
  const { element, content, bullet } = styles
  return (
    <section className={element}>
      <div className={bullet} />
      <div className={content}>{children}</div>
    </section>
  )
}
