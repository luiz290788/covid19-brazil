import React from "react"
import { Link } from "gatsby"
import styles from "../styles/region-list.module.css"

export const RegionList = ({ title, regions }) => {
  return (
    <table className={styles.regionTable}>
      <thead>
        <tr>
          <td>{title}</td>
          <td className={styles.casesColumn}># Casos</td>
          <td className={styles.deathsColumn}># Mortes</td>
        </tr>
      </thead>
      <tbody>
        {regions.map(region => (
          <tr>
            <td>
              <Link to={region.slug}>{region.name}</Link>
            </td>
            <td className={styles.casesColumn}>{region.lastData.cases}</td>
            <td className={styles.deathsColumn}>{region.lastData.deaths}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
