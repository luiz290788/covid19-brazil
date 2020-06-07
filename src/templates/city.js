import React from "react"
import { graphql, Link } from "gatsby"
import { NumbersPage } from "../components/numbers-page"
import { StatesList } from "../components/states-list"
import { RegionList } from "../components/region-list"
import { string2slug } from "../utils"

export const query = graphql`
  query($id: String!, $parentInitials: String!, $parentIdInt: Int!) {
    covidJson(id: { eq: $id }) {
      name
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
    siblings: allCovidJson(
      filter: { parentId: { eq: $parentIdInt } }
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
    statesBrazilCsv(initials: { eq: $parentInitials }) {
      parentName: name
    }
  }
`

export default ({ pageContext, data }) => {
  const {
    covidJson: { lastData, population, name, timeseries },
    statesBrazilCsv: { parentName },
    siblings: { nodes },
  } = data
  const { parentSlug } = pageContext
  const citiesData = nodes.map(city => ({
    ...city,
    slug: `${parentSlug}/${string2slug(city.name)}`,
  }))
  return (
    <NumbersPage
      currentData={lastData}
      breadcrumb={[
        <Link to="/">Brasil</Link>,
        <Link to={parentSlug}>{parentName}</Link>,
      ]}
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
