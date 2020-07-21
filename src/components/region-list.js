import React from "react"
import { Link } from "gatsby"
import styles from "../styles/region-list.module.css"
import { useCovidData } from "../hooks/useCovidData"
import { string2slug } from "../utils"

const regionSlug = (region) => region.parentName === 'Brasil' ?
  `/${string2slug(region.name)}` : `/${string2slug(region.parentName)}/${string2slug(region.name)}`

export const RegionList = ({ title, parentId, nameMapping }) => {
  let { data, loading } = useCovidData(`list-${parentId}`)
  data = (data || []).sort((r1, r2) => r2.cases - r1.cases)
  return (
    loading ? 'Loading' : (<table className={styles.regionTable}>
      <thead>
        <tr>
          <td>{title}</td>
          <td className={styles.casesColumn}># Casos</td>
          <td className={styles.deathsColumn}># Mortes</td>
        </tr>
      </thead>
      <tbody>
        {data.map(region => (
          <tr>
            <td>
              <Link to={regionSlug(region)}>{(nameMapping || {})[region.name] || region.name}</Link>
            </td>
            <td className={styles.casesColumn}>{region.cases}</td>
            <td className={styles.deathsColumn}>{region.deaths}</td>
          </tr>
        ))}
      </tbody>
    </table>)
  )
}
