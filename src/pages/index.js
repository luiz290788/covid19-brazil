import React from "react"
import Header from "../components/header"
import { graphql } from "gatsby"
import { LineChart } from "../components/line-chart"
import { ParentSize } from "@vx/responsive"
import { RegionList } from "../components/region-list"

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

const getCases = point => point.Cases
const getDate = point => point.date
const getDeaths = point => point.Deaths

export default ({ data }) => {
  const groups = data.allCovid19BrazilCsv.group
  const totalByDate = groups.map(group => ({
    date: new Date(group.fieldValue),
    Cases: group.nodes.reduce((sum, { Cases }) => sum + Cases, 0),
    Deaths: group.nodes.reduce((sum, { Deaths }) => sum + Deaths, 0),
  }))
  const currentDate = totalByDate[totalByDate.length - 1]

  const currentDateByState = groups[groups.length - 1].nodes.map(region => ({
    name: region.Region,
    Cases: region.Cases,
    Deaths: region.Deaths,
  }))

  return (
    <React.Fragment>
      <Header />
      <ParentSize>
        {({ width, height }) => (
          <>
            <LineChart
              title="Casos"
              data={totalByDate}
              height={400}
              width={width}
              getX={getDate}
              getY={getCases}
            />
            <LineChart
              title="Mortes"
              data={totalByDate}
              height={400}
              width={width}
              getX={getDate}
              getY={getDeaths}
            />
          </>
        )}
      </ParentSize>
      <RegionList data={currentDateByState} />
    </React.Fragment>
  )
}
