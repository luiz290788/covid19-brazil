/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Radar Covid-19 Brasil",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Lato"],
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: "gatsby-transformer-csv",
      options: {
        colParser: {
          Cases: "number",
          Deaths: "number",
          population: "number",
        },
      },
    },
  ],
}
