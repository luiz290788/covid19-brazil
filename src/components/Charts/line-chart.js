import React, { useState } from "react"

import { Group } from "@vx/group"
import { LinePath } from "@vx/shape"
import { scaleTime, scaleLinear } from "@vx/scale"
import { GlyphDot } from "@vx/glyph"
import { AxisLeft, AxisBottom } from "@vx/axis"
import { GridRows } from "@vx/grid"
import { withTooltip, Tooltip } from "@vx/tooltip"
import { Text } from "@vx/text"

import { extent, max } from "d3-array"

function numTicksForWidth(height) {
  if (height <= 300) return 3
  if (300 < height && height <= 600) return 5
  return 10
}

const tickLabelSize = 13

export const LineChart = withTooltip(
  ({
    data,
    width,
    height,
    tooltip,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
    getX,
    getY,
    title,
    color,
  }) => {
    const strokeSize = 1
    const margin = 60 + strokeSize
    const rightMargin = 25

    const xMax = width - margin - rightMargin
    const yMax = height - margin * 2

    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, getX),
    })
    const maxValue = max(data, getY)
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, Math.ceil(maxValue * 1.15)],
    })
    const [tooltipTimeout, setTooltipTimeout] = useState(undefined)

    return (
      <>
        <svg
          width={width}
          height={height}
          style={{
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
          <Group top={25}>
            <Text
              textAnchor="middle"
              x={width / 2}
              fontFamily="'Lato'"
              fontWeight={600}
              fontSize={20}
              verticalAnchor="start"
            >
              {title}
            </Text>
          </Group>
          <GridRows
            top={margin}
            left={margin}
            scale={yScale}
            stroke="#cccccc"
            width={xMax}
            height={yMax}
            numTicksForWidth={numTicksForWidth(width)}
          />
          <Group top={margin} left={margin}>
            <LinePath
              data={data}
              x={d => xScale(getX(d))}
              y={d => yScale(getY(d))}
              stroke={color}
              strokeWidth={3}
            />
            {data.map((d, i) => {
              const cx = xScale(getX(d))
              const cy = yScale(getY(d))
              return (
                <g key={`line-point-${i}`}>
                  <GlyphDot
                    cx={cx}
                    cy={cy}
                    r={7}
                    opacity={d === tooltipData ? 1 : 0}
                    fill={color}
                    onMouseEnter={() => {
                      if (tooltipTimeout) {
                        clearTimeout(tooltipTimeout)
                        setTooltipTimeout(undefined)
                      }
                      showTooltip({
                        tooltipData: d,
                        tooltipTop: cy,
                        tooltipLeft: cx,
                      })
                    }}
                    onMouseLeave={() => {
                      setTooltipTimeout(setTimeout(hideTooltip, 1000))
                    }}
                  />
                  <GlyphDot
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={color}
                    onMouseEnter={() => {
                      showTooltip({
                        tooltipData: d,
                        tooltipTop: cy,
                        tooltipLeft: cx,
                      })
                    }}
                    onMouseLeave={hideTooltip}
                  />
                </g>
              )
            })}
          </Group>
          <Group left={margin}>
            <AxisLeft
              scale={yScale}
              top={margin}
              left={0}
              hideZero
              stroke="#1b1a1e"
              hideTicks
              hideAxisLine
              tickLabelProps={(value, index) => ({
                fill: "#000000",
                textAnchor: "end",
                fontSize: tickLabelSize,
                fontFamily: "'Lato'",
                fontWeight: "600",
                dx: "-0.25em",
                dy: "0.25em",
              })}
              tickComponent={({ formattedValue, ...tickProps }) => (
                <text {...tickProps}>{formattedValue}</text>
              )}
            />
            <AxisBottom
              top={height - margin}
              left={0}
              scale={xScale}
              numTicks={numTicksForWidth(width)}
              tickFormat={date => {
                if (date.getUTCDate() === 1) {
                  if (date.getUTCMonth() === 1) {
                    return date.getUTCFullYear()
                  }
                  return date.toLocaleString("pt-BR", {
                    month: "short",
                    timeZone: "UTC",
                  })
                }
                return date.toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "numeric",
                })
              }}
            >
              {axis => {
                const tickRotate = -45
                const tickColor = "#000000"
                return (
                  <g className="my-custom-bottom-axis">
                    {axis.ticks.map((tick, i) => {
                      const tickX = tick.to.x + 5
                      const tickY = tick.to.y + tickLabelSize
                      return (
                        <Group
                          key={`vx-tick-${tick.value}-${i}`}
                          className={"vx-axis-tick"}
                        >
                          <text
                            transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                            fontSize={tickLabelSize}
                            textAnchor="middle"
                            fontFamily="'Lato'"
                            fontWeight="600"
                            fill={tickColor}
                          >
                            {tick.formattedValue}
                          </text>
                        </Group>
                      )
                    })}
                  </g>
                )
              }}
            </AxisBottom>
          </Group>
        </svg>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop + margin - 10}
            left={tooltipLeft + margin - 10}
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
            {tooltip(tooltipData)}
          </Tooltip>
        )}
      </>
    )
  }
)
