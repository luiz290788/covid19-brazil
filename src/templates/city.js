import React from "react"
import { graphql, Link } from "gatsby"
import { NumbersPage } from "../components/numbers-page"
import { StatesList } from "../components/states-list"
import { RegionList } from "../components/region-list"
import { useCovidData } from "../hooks/useCovidData"

export const query = graphql`
  query($parentInitials: String!) {
    statesBrazilCsv(initials: { eq: $parentInitials }) {
      parentName: name
    }
  }
`

export default ({ pageContext, data, ...rest }) => {
  const {
    statesBrazilCsv: { parentName },
  } = data
  const { parentSlug } = pageContext

  const { data: covidData, loading } = useCovidData(pageContext.id)
  const { lastData, population, name, timeseries } = covidData || {}

  return (
    loading ? 'Loading' : (<NumbersPage
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
          <RegionList parentId={pageContext.parentId} title="Cidade" />
          <h3>Veja os números dos outros estados</h3>
          <StatesList />
        </>
      )}
    />)
  )
}
