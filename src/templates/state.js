import React from "react"
import { graphql, Link } from "gatsby"
import { NumbersPage } from "../components/numbers-page"
import { StatesList } from "../components/states-list"
import { string2slug } from "../utils"
import { RegionList } from "../components/region-list"

export const query = graphql`
  query($id: String!, $initials: String!, $idInt: Int!) {
    covidJson(id: { eq: $id }) {
      initials: name
      population
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
    children: allCovidJson(
      filter: { parentId: { eq: $idInt } }
      sort: { fields: lastData___cases, order: DESC }
    ) {
      nodes {
        name
        lastData {
          cases
          deaths
        }
      }
    }
    statesBrazilCsv(initials: { eq: $initials }) {
      name
    }
  }
`

export default ({ pageContext, data, path }) => {
  const {
    covidJson: { lastData, population, timeseries },
    statesBrazilCsv: { name },
    children: { nodes },
  } = data

  const citiesData = nodes.map(city => ({
    ...city,
    slug: `${path}/${string2slug(city.name)}`,
  }))
  return (
    <NumbersPage
      currentData={lastData}
      breadcrumb={[<Link to="/">Brasil</Link>]}
      name={name}
      population={population}
      timeseries={timeseries}
      footer={() => (
        <>
          <RegionList regions={citiesData} title="Cidade" />
          <h3>Veja os números dos outros estados</h3>
          <StatesList />
        </>
      )}
    />
  )
}
