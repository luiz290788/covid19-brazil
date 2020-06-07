import React from "react"
import { ParentSize } from "@vx/responsive"
import { WeeklyHeatMap } from "./weekly-heat-map"
import styles from "../../styles/base-heat-map.module.css"

export const BaseHeatMap = ({ data }) => (
  <div className={styles.heatmapContainer}>
    <ParentSize>
      {({ width, height }) => (
        <WeeklyHeatMap
          data={data.map(point => ({
            date: point.date,
            value: point.cases,
            meta: point,
          }))}
          bottomColor="#506C6D"
          topColor="#243B4A"
          width={width}
          height="800"
          title="Novos casos por dia"
          tooltip={bin => (
            <>
              <div>
                <small>
                  {bin.date.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </small>
              </div>
              <div>{bin.meta.cases} casos</div>
              <div>{bin.count} novos casos</div>
            </>
          )}
        />
      )}
    </ParentSize>
    <ParentSize>
      {({ width, height }) => (
        <WeeklyHeatMap
          data={data.map(point => ({
            date: point.date,
            value: point.deaths,
            meta: point,
          }))}
          bottomColor="#77312f"
          topColor="#f33d15"
          width={width}
          height="800"
          title="Novas mortes por dia"
          tooltip={bin => (
            <>
              <div>
                <small>
                  {bin.date.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </small>
              </div>
              <div>{bin.meta.deaths} mortes</div>
              <div>{bin.count} novas mortes</div>
            </>
          )}
        />
      )}
    </ParentSize>
  </div>
)
