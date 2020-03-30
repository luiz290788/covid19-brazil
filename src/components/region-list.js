import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import styles from "../styles/region-list.module.css"

export const RegionList = () => {
  const statesData = useStaticQuery(graphql`
    query {
      allStatesBrazilCsv {
        nodes {
          initials
          name
        }
      }
      allCovid19BrazilCsv(sort: { fields: Date, order: DESC }, limit: 27) {
        group(field: Date) {
          fieldValue
          nodes {
            Region
            Cases
            Deaths
          }
        }
      }
    }
  `)

  const currentDateByState = statesData.allCovid19BrazilCsv.group[0].nodes
    .map(region => ({
      name: region.Region,
      Cases: region.Cases,
      Deaths: region.Deaths,
    }))
    .sort((a, b) => b.Cases - a.Cases)

  const stateByInitials = statesData.allStatesBrazilCsv.nodes.reduce(
    (states, state) => ({ ...states, [state.initials]: state.name }),
    {}
  )

  return (
    <table className={styles.regionTable}>
      <thead>
        <tr>
          <td>Estado</td>
          <td className={styles.casesColumn}># Casos</td>
          <td className={styles.deathsColumn}># Mortes</td>
        </tr>
      </thead>
      <tbody>
        {currentDateByState.map(region => (
          <tr>
            <td>
              <Link to={`/${region.name.toLowerCase()}/`}>
                {stateByInitials[region.name]}
              </Link>
            </td>
            <td className={styles.casesColumn}>{region.Cases}</td>
            <td className={styles.deathsColumn}>{region.Deaths}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
