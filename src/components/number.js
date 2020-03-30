import React from "react"
import numeral from "numeral"
import styles from "../styles/number.module.css"

export const formatNumber = value => {
  if (value > 1000) {
    return numeral(value).format("0.0a")
  }
  return value
}

export const formatPercentage = value => numeral(value).format("0.0%")

export const Number = ({ children, title, formatFunction }) => (
  <div className={styles.numberContainer}>
    <div className={styles.title}>{title}</div>
    <div className={styles.number} title={children}>
      {formatFunction(children)}
    </div>
  </div>
)

Number.defaultProps = {
  formatFunction: formatNumber,
}
