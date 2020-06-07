import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { RegionList } from "./region-list"

export const StatesList = ({ parentId }) => {
  const statesData = useStaticQuery(graphql`
    query {
      allStatesBrazilCsv {
        nodes {
          initials
          name
        }
      }
      allCovidJson(
        sort: { fields: lastData___cases, order: DESC }
        filter: { parentId: { eq: 76 } }
      ) {
        nodes {
          initials: name
          lastData {
            cases
            deaths
          }
        }
      }
    }
  `)

  const stateByInitials = statesData.allStatesBrazilCsv.nodes.reduce(
    (states, state) => ({ ...states, [state.initials]: state.name }),
    {}
  )

  const regions = statesData.allCovidJson.nodes.map(region => ({
    ...region,
    name: stateByInitials[region.initials],
    slug: `/${region.initials.toLowerCase()}/`,
  }))

  return <RegionList regions={regions} title="Estado" />
}
