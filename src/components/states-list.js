import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { RegionList } from "./region-list"

export const StatesList = () => {
  const statesData = useStaticQuery(graphql`
    query {
      allStatesBrazilCsv {
        nodes {
          initials
          name
        }
      }
    }
  `)

  const stateByInitials = statesData.allStatesBrazilCsv.nodes.reduce(
    (states, state) => ({ ...states, [state.initials]: state.name }),
    {}
  )
  return <RegionList parentId={76} title="Estado" nameMapping={stateByInitials} />
}
