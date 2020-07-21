import React from "react"
import styles from "../styles/last-update.module.css"
import { useCovidData } from "../hooks/useCovidData"

export const LastUpdate = () => {
  const { data, loading } = useCovidData('last-updated')
  if (loading) {
    return null
  }
  return (
    <div className={styles.lastUpdate}>
      Última atualização:{" "}
      {new Date(data.date).toLocaleString("pt-BR")}
    </div>
  )
}
