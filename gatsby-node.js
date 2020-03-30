const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

const createRegionPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      allCovid19BrazilCsv {
        group(field: Region) {
          fieldValue
        }
      }
    }
  `)

  result.data.allCovid19BrazilCsv.group.forEach(({ fieldValue }) =>
    actions.createPage({
      component: path.resolve("./src/templates/state.js"),
      path: `/${fieldValue.toLowerCase()}`,
      context: {
        region: fieldValue,
      },
    })
  )
}

const createMDNodes = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/static-page.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}

exports.createPages = options =>
  Promise.all([createRegionPages, createMDNodes].map(f => f(options)))
