import React from "react"
import { graphql } from "gatsby"
import { Container } from "../components/container"
import { BaseCharts } from "../components/Charts/base-charts"
import { BaseHeatMap } from "../components/Charts/base-heat-map"
import { Number, formatPercentage } from "../components/number"
import { Numbers } from "../components/numbers"
import { MapBrazil } from "../components/Charts/map"
import { ParentSize } from "@vx/responsive"
import { StatesList } from "../components/states-list"

export const query = graphql`
  query {
    allCovidJson(filter: { id: { eq: "76" } }) {
      nodes {
        lastData {
          cases
          deaths
        }
        timeseries {
          date
          cases
          deaths
        }
      }
    }
  }
`

export default ({ data }) => {
  const {
    lastData: { cases, deaths },
    timeseries: timeseriesRaw,
  } = data.allCovidJson.nodes[0]

  const timeseries = timeseriesRaw.map(({ date, ...rest }) => ({
    ...rest,
    date: new Date(date),
  }))

  return (
    <Container>
      <Numbers>
        <Number title="Casos">{cases}</Number>
        <Number title="Mortes">{deaths}</Number>
        <Number title="Mortalidade" formatFunction={formatPercentage}>
          {deaths / cases}
        </Number>
      </Numbers>
      <ParentSize>
        {({ width }) => (
          <MapBrazil
            width={width}
            height={width}
            bottomColor="#85C7F2"
            topColor="#BB0A21"
          />
        )}
      </ParentSize>
      <BaseCharts data={timeseries} />
      <BaseHeatMap data={timeseries} />
      <StatesList />
    </Container>
  )
}
