import React, { useMemo } from "react"
import { Container } from "../components/container"
import { BaseCharts } from "../components/Charts/base-charts"
import { BaseHeatMap } from "../components/Charts/base-heat-map"
import { Number, formatPercentage } from "../components/number"
import numeral from "numeral"
import { Numbers } from "../components/numbers"
import styles from "../styles/numbers-page.module.css"

const Breadcrumb = ({ links }) => (
  <ul className={styles.breadcrumb}>
    {links.map(link => (
      <li>{link}</li>
    ))}
  </ul>
)

export const NumbersPage = ({
  timeseries,
  population,
  breadcrumb,
  name,
  currentData,
  footer,
}) => {
  const memoTimeseries = useMemo(
    () =>
      timeseries.map(point => ({
        ...point,
        date: new Date(point.date),
      })),
    [timeseries]
  )
  return (
    <Container>
      {breadcrumb ? <Breadcrumb links={breadcrumb} /> : null}
      <h2>{name}</h2>
      <Numbers>
        <Number title="População">{population}</Number>
        <Number title="Casos">{currentData.cases}</Number>
        <Number title="Mortes">{currentData.deaths}</Number>
        <Number
          title="Casos / 100m"
          formatFunction={value => numeral(value).format("0.0")}
        >
          {currentData.cases / (population / 100000)}
        </Number>
        <Number title="Mortalidade" formatFunction={formatPercentage}>
          {currentData.deaths / currentData.cases}
        </Number>
      </Numbers>
      <BaseCharts data={memoTimeseries} />
      <BaseHeatMap data={memoTimeseries} />
      {footer()}
    </Container>
  )
}
