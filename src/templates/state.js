import React from "react"
import { graphql } from "gatsby"
import { Container } from "../components/container"
import { BaseCharts } from "../components/base-charts"
import { BaseHeatMap } from "../components/base-heat-map"
import { Number, formatPercentage } from "../components/number"
import numeral from "numeral"
import { Numbers } from "../components/numbers"
import { RegionList } from "../components/region-list"

export const query = graphql`
  query($region: String!) {
    allCovid19BrazilCsv(
      filter: { Region: { eq: $region } }
      sort: { fields: Date, order: DESC }
    ) {
      nodes {
        Date
        Cases
        Deaths
      }
    }
    allStatesBrazilCsv(filter: { initials: { eq: $region } }) {
      nodes {
        name
        population
      }
    }
  }
`

export default ({ pageContext, data }) => {
  const nodes = data.allCovid19BrazilCsv.nodes.map(point => ({
    ...point,
    date: new Date(point.Date),
  }))
  const latest = nodes[0]
  const { name, population } = data.allStatesBrazilCsv.nodes[0]
  return (
    <Container>
      <h2>{name}</h2>
      <Numbers>
        <Number title="População">{population}</Number>
        <Number title="Casos">{latest.Cases}</Number>
        <Number title="Mortes">{latest.Deaths}</Number>
        <Number
          title="Casos / 100m"
          formatFunction={value => numeral(value).format("0.0")}
        >
          {latest.Cases / (population / 100000)}
        </Number>
        <Number title="Mortalidade" formatFunction={formatPercentage}>
          {latest.Deaths / latest.Cases}
        </Number>
      </Numbers>
      <BaseCharts data={nodes} />
      <BaseHeatMap data={nodes} />
      <h3>Veja os números dos outros estados</h3>
      <RegionList />
    </Container>
  )
}
