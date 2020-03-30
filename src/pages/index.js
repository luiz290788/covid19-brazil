import React from "react"
import { graphql } from "gatsby"
import { Container } from "../components/container"
import { BaseCharts } from "../components/base-charts"
import { BaseHeatMap } from "../components/base-heat-map"
import { Number, formatPercentage } from "../components/number"
import { Numbers } from "../components/numbers"

export const query = graphql`
  query {
    allCovid19BrazilCsv(sort: { fields: Date, order: ASC }) {
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
`

export default ({ data }) => {
  const groups = data.allCovid19BrazilCsv.group
  const totalByDate = groups.map(group => ({
    date: new Date(group.fieldValue),
    Cases: group.nodes.reduce((sum, { Cases }) => sum + Cases, 0),
    Deaths: group.nodes.reduce((sum, { Deaths }) => sum + Deaths, 0),
  }))
  const currentDate = totalByDate[totalByDate.length - 1]

  return (
    <Container>
      <Numbers>
        <Number title="Casos">{currentDate.Cases}</Number>
        <Number title="Mortes">{currentDate.Deaths}</Number>
        <Number title="Mortalidade" formatFunction={formatPercentage}>
          {currentDate.Deaths / currentDate.Cases}
        </Number>
      </Numbers>
      <BaseCharts data={totalByDate} />
      <BaseHeatMap data={totalByDate} />
    </Container>
  )
}
