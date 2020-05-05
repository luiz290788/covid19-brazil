import React, { useState } from "react"
import { Group } from "@vx/group"
import { scaleLinear } from "@vx/scale"
import { HeatmapRect } from "@vx/heatmap"
import { max } from "d3-array"
import { min } from "d3-array"
import { withTooltip, Tooltip } from "@vx/tooltip"
import { Text } from "@vx/text"

const msInDay = 24 * 60 * 60 * 1000

const generateBins = data => {
  const sortedData = data.concat().sort((a, b) => a.date - b.date)

  let currentBin = {
    bin: 0,
    bins: [],
  }
  const bins = []
  bins.push(currentBin)

  let index = 0
  let previousValue = 0

  while (index < sortedData.length) {
    const current = sortedData[index]
    const currentWeekDay = current.date.getUTCDay()
    const currentValue = current.value
    currentBin.bins[currentWeekDay] = {
      ...current,
      count: currentValue - previousValue,
      bin: currentWeekDay,
    }
    previousValue = currentValue
    index++

    if (
      sortedData[index] &&
      (sortedData[index].date - current.date) / msInDay + currentWeekDay > 6
    ) {
      currentBin = {
        bin: currentBin.bin + 1,
        bins: [],
      }
      bins.push(currentBin)
    }
  }
  return bins
}

export const WeeklyHeatMap = withTooltip(
  ({
    margin,
    data,
    width,
    height,
    binSize,
    title,
    tooltip,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
    bottomColor,
    topColor,
  }) => {
    const strokeSize = 1
    const bins = generateBins(data)
    const titleHeight = 35
    const chartHeight = min([margin * 2 + 7 * binSize + titleHeight, height])
    const heatmapHeight = chartHeight - margin * 2 - titleHeight
    const actualBinSize = Math.floor(heatmapHeight / 7)

    const weekCount = min([Math.floor(width / actualBinSize), bins.length])
    // const actualWidth = weekCount * actualBinSize

    const [tooltipTimeout, setTooltipTimeout] = useState(undefined)

    const colorMax = max(bins, d => max(d.bins, b => b?.count))
    const bucketSizeMax = 7

    // scales
    const xScale = scaleLinear({
      domain: [0, weekCount],
    })
    const yScale = scaleLinear({
      domain: [0, bucketSizeMax],
    })
    const colorScale = scaleLinear({
      range: [bottomColor, topColor],
      domain: [0, colorMax],
    })
    const opacityScale = scaleLinear({
      range: [0.1, 1],
      domain: [0, colorMax],
    })

    xScale.range([0, weekCount * actualBinSize])
    yScale.range([0, actualBinSize * 7])

    const leftPadding = width / 2 - (weekCount * actualBinSize) / 2

    return (
      <>
        <svg
          width={width}
          height={chartHeight}
          style={{
            boxShadow: "0 4px 6px 0 rgba(31,70,88,.04)",
          }}
        >
          <rect
            x={strokeSize}
            y={strokeSize}
            width={width - strokeSize * 2}
            height={chartHeight - strokeSize * 2}
            fill="#ffffff"
            rx={10}
            stroke="#dbe9f5"
            strokeWidth={strokeSize}
          />
          <Group top={margin}>
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
          <Group
            top={margin + titleHeight}
            left={leftPadding}
            alignmentBaseline="middle"
          >
            <HeatmapRect
              data={bins.slice(-1 * weekCount)}
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
              opacityScale={opacityScale}
              binWidth={actualBinSize}
              binHeight={actualBinSize}
              gap={2}
            >
              {heatmap =>
                heatmap.map(bins =>
                  bins.map(bin => (
                    <rect
                      key={`heatmap-react-${bin.row}-${bin.column}`}
                      className="vx-heatmap-react"
                      width={bin.width}
                      height={bin.height}
                      x={bin.x}
                      y={bin.y}
                      fill={bin.color}
                      fillOpacity={bin.opacity}
                      onMouseEnter={() => {
                        if (tooltipTimeout) {
                          clearTimeout(tooltipTimeout)
                          setTooltipTimeout(undefined)
                        }
                        showTooltip({
                          tooltipData: bin.bin,
                          tooltipTop: bin.y + margin + titleHeight,
                          tooltipLeft: bin.x + leftPadding,
                        })
                      }}
                      onMouseLeave={() => {
                        setTooltipTimeout(setTimeout(hideTooltip, 1000))
                      }}
                    />
                  ))
                )
              }
            </HeatmapRect>
          </Group>
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
            {tooltip(tooltipData)}
          </Tooltip>
        )}
      </>
    )
  }
)

WeeklyHeatMap.defaultProps = {
  margin: 20,
  gap: 2,
  binSize: 20,
}
