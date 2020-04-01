import React from "react"
import { Helmet } from "react-helmet"

import { useStaticQuery, graphql } from "gatsby"

export const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.site.siteMetadata.title}</title>
        <meta
          name="description"
          content="Acompanhe a evoluação da doença Covid-19 no Brasil causada pelo novo
          Coronavirus."
        />
        <meta
          name="keywords"
          content="covid-19, covid19, corona, coronavirus, Brasil, saúde, doença, casos,
          mortes, mortalidade, radar, painel, gráficos"
        />
        <meta
          name="google-site-verification"
          content="OTQj_Ow0DIvqA7lNAw4aUnHOcWp1VWvwMHR-V7TjOdM"
        />
      </Helmet>
      <h1 style={{ textAlign: "center" }}>{data.site.siteMetadata.title}</h1>
    </>
  )
}
