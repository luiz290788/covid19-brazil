import React from "react"
import { LineChart } from "./line-chart"
import { ParentSize } from "@vx/responsive"

const getCases = point => point.cases
const getDate = point => point.date
const getDeaths = point => point.deaths

export const BaseCharts = ({ data }) => {
  return (
    <ParentSize>
      {({ width, height }) => (
        <>
          <LineChart
            title="Casos"
            color="#3D61FB"
            data={data}
            height={400}
            width={width}
            getX={getDate}
            getY={getCases}
            tooltip={tooltipData => (
              <>
                <div>
                  <small>
                    {getDate(tooltipData).toLocaleDateString("pt-BR", {
                      timeZone: "UTC",
                    })}
                  </small>
                </div>
                <div>{getCases(tooltipData)} casos</div>
              </>
            )}
          />
          <LineChart
            title="Mortes"
            color="#9A4050"
            data={data}
            height={400}
            width={width}
            getX={getDate}
            getY={getDeaths}
            tooltip={tooltipData => (
              <>
                <div>
                  <small>
                    {getDate(tooltipData).toLocaleDateString("pt-BR", {
                      timeZone: "UTC",
                    })}
                  </small>
                </div>
                <div>{getDeaths(tooltipData)} mortes</div>
              </>
            )}
          />
        </>
      )}
    </ParentSize>
  )
}
