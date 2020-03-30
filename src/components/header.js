import React from "react"

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
  return <h1 style={{ textAlign: "center" }}>{data.site.siteMetadata.title}</h1>
}
