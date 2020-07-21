import React from "react"
import { Container } from "../components/container"
import { BaseCharts } from "../components/Charts/base-charts"
import { BaseHeatMap } from "../components/Charts/base-heat-map"
import { Number, formatPercentage } from "../components/number"
import { Numbers } from "../components/numbers"
import { MapBrazil } from "../components/Charts/map"
import { ParentSize } from "@vx/responsive"
import { StatesList } from "../components/states-list"
import { useCovidData } from "../hooks/useCovidData"

export default () => {
  const { data, loading } = useCovidData(76)

  const {
    lastData,
    timeseries: timeseriesRaw,
  } = data || {}
  const timeseries = (timeseriesRaw || []).map(({ date, ...rest }) => ({
    ...rest,
    date: new Date(date),
  }))

  return (
    loading ? 'Loading' : (<Container>
      <Numbers>
        <Number title="Casos">{lastData.cases}</Number>
        <Number title="Mortes">{lastData.deaths}</Number>
        <Number title="Mortalidade" formatFunction={formatPercentage}>
          {lastData.deaths / lastData.cases}
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
    </Container>)
  )
}
