import React from "react"
import { graphql, Link } from "gatsby"
import { NumbersPage } from "../components/numbers-page"
import { StatesList } from "../components/states-list"
import { RegionList } from "../components/region-list"
import { useCovidData } from "../hooks/useCovidData"

export const query = graphql`
  query($initials: String!) {
    statesBrazilCsv(initials: { eq: $initials }) {
      name
    }
  }
`

export default ({ pageContext, data, path }) => {
  const {
    statesBrazilCsv: { name },
  } = data

  const { data: covidData, loading } = useCovidData(pageContext.id)
  const { lastData, population, timeseries } = covidData || {}
  return (
    loading ? 'Loading' : (<NumbersPage
      currentData={lastData}
      breadcrumb={[<Link to="/">Brasil</Link>]}
      name={name}
      population={population}
      timeseries={timeseries}
      footer={() => (
        <>
          <RegionList parentId={pageContext.id} title="Cidade" />
          <h3>Veja os números dos outros estados</h3>
          <StatesList />
        </>
      )}
    />)
  )
}
