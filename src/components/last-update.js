import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styles from "../styles/last-update.module.css"

export const LastUpdate = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        buildTime
      }
    }
  `)
  return (
    <div className={styles.lastUpdate}>
      Última atualização:{" "}
      {new Date(data.site.buildTime).toLocaleString("pt-BR")}
    </div>
  )
}
