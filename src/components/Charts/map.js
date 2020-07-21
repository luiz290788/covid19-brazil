import React from "react"
import { navigate } from "gatsby"
import * as topojson from "topojson-client"
import { useStaticQuery, graphql } from "gatsby"
import { CustomProjection } from "@vx/geo"
import { scalePower } from "@vx/scale"
import topology from "../../data/uf.json"
import { geoMercator } from "d3-geo"
import { max, min } from "d3-array"
import { withTooltip, Tooltip } from "@vx/tooltip"
import { useCovidData } from "../../hooks/useCovidData"

const brazil = topojson.feature(topology, topology.objects.estados)
const bg = "#ffffff"

export const MapBrazil = withTooltip(
  ({
    centerState,
    width,
    height,
    bottomColor,
    topColor,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  }) => {
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

    const { data: covidData, loading } = useCovidData('list-76')
    if (loading) {
      return 'Loading'
    }

    const colorMax = max(
      covidData,
      node => node.cases
    )
    const colorMin = min(
      covidData,
      node => node.cases
    )

    const casesByState = covidData.reduce(
      (states, state) => ({ ...states, [state.name]: state }),
      {}
    )

    const stateByInitials = statesData.allStatesBrazilCsv.nodes.reduce(
      (states, state) => ({ ...states, [state.initials]: state.name }),
      {}
    )

    const colorScale = scalePower({
      exponent: 0.5,
      range: [bottomColor, topColor],
      domain: [colorMin, colorMax],
    })

    const strokeSize = 1
    const margin = 20

    return (
      <>
        <svg
          width={width}
          height={height}
          style={{
            borderRadius: 10,
            boxShadow: "0 4px 6px 0 rgba(31,70,88,.04)",
          }}
        >
          <rect
            x={strokeSize}
            y={strokeSize}
            width={width - strokeSize * 2}
            height={height - strokeSize * 2}
            fill="#ffffff"
            rx={10}
            stroke="#dbe9f5"
            strokeWidth={strokeSize}
          />
          <CustomProjection
            projection={geoMercator}
            data={brazil.features}
            fitExtent={[
              [
                [margin, margin],
                [width - margin, height - margin],
              ],
              centerState
                ? brazil.features.find(feature => feature.id === centerState)
                : brazil,
            ]}
          >
            {customProjection => (
              <g>
                {customProjection.features.map(
                  ({ feature, path, centroid, ...rest }, i) => (
                    <path
                      style={{ cursor: "pointer" }}
                      key={`map-feature-${i}`}
                      d={path}
                      fill={colorScale(casesByState[feature.id].cases)}
                      stroke={bg}
                      strokeWidth={0.5}
                      onClick={event => {
                        navigate(`/${feature.id.toLowerCase()}/`)
                      }}
                      onMouseEnter={event => {
                        showTooltip({
                          tooltipData: feature,
                          tooltipTop: centroid[1],
                          tooltipLeft: centroid[0],
                        })
                      }}
                      onMouseLeave={() => {
                        hideTooltip()
                      }}
                    />
                  )
                )}
              </g>
            )}
          </CustomProjection>
        </svg>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              backgroundColor: "#ffffff",
              color: "black",
              border: "1px solid black",
              boxShadow: "0 4px 6px 0 rgba(31,70,88,.04)",
              transform: "translate(-100%, -100%)",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <div>{stateByInitials[tooltipData.id]}</div>
            <div>{casesByState[tooltipData.id].cases} casos</div>
          </Tooltip>
        )}
      </>
    )
  }
)
