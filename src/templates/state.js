import React from "react"
import { graphql } from "gatsby"

export const query = graphql`
  query($region: String!) {
    allCovid19BrazilCsv(filter: { Region: { eq: $region } }) {
      nodes {
        Date
        Cases
        Deaths
      }
    }
  }
`

export default ({ pageContext, data }) => {
  const computed = data.allCovid19BrazilCsv.nodes.reduce(
    (a, b) => ({
      Cases: a.Cases + b.Cases,
      Deaths: a.Deaths + b.Deaths,
    }),
    { Cases: 0, Deaths: 0 }
  )
  const nodes = data.allCovid19BrazilCsv.nodes
  const latest = nodes[nodes.length - 1]
  return (
    <div>
      state {pageContext.state} Cases: {latest.Cases} Deaths: {latest.Deaths}
    </div>
  )
}
