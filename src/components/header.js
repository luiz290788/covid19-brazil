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
      </Helmet>
      <h1 style={{ textAlign: "center" }}>{data.site.siteMetadata.title}</h1>
    </>
  )
}
