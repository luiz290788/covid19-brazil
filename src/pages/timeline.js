import React from "react"
import { graphql } from "gatsby"
import moment from "moment"
import { Container } from "../components/container"
import { Timeline, TimelineElement } from "../components/Timeline"
import styles from "../styles/timeline.module.css"

export const query = graphql`
  query {
    allTimelineCsv {
      group(field: date) {
        fieldValue
        nodes {
          title
          reference
        }
      }
    }
  }
`

export default ({ data }) => {
  const groups = data.allTimelineCsv.group.sort((a, b) =>
    b.fieldValue.localeCompare(a.fieldValue)
  )

  return (
    <Container>
      <h1>Linha do tempo</h1>
      <p>Fatos sobre a Covid-19 no Brasil e no mundo.</p>
      <Timeline>
        {groups.map(({ nodes, fieldValue }) => (
          <TimelineElement>
            <p className={styles.date}>
              {moment(fieldValue).format("DD/MM/YYYY")}
            </p>
            {nodes.map(({ title, reference }) => (
              <p>
                <a href={reference} target="_blank" rel="noopener noreferrer">
                  {title}
                </a>
              </p>
            ))}
          </TimelineElement>
        ))}
      </Timeline>
    </Container>
  )
}
