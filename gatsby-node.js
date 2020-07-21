const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const { string2slug } = require("./src/utils")

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
  const query = `
  query($id: Int!) {
    allPageIndexJson(filter: { parentId: { eq: $id } }) {
      nodes {
        id
        name
        parentId
        parentName
      }
    }
  }
`
  const result = await graphql(query, { id: 76 })

  await Promise.all(
    result.data.allPageIndexJson.nodes.map(async ({ name, id }) => {
      const parentSlug = `/${name.toLowerCase()}`
      const idInt = parseInt(id, 10)
      actions.createPage({
        component: path.resolve("./src/templates/state.js"),
        path: parentSlug,
        context: { id, initials: name, idInt },
      })

      const childrenResult = await graphql(query, { id: idInt })

      childrenResult.data.allPageIndexJson.nodes.map(child =>
        actions.createPage({
          component: path.resolve("./src/templates/city.js"),
          path: `/${name.toLowerCase()}/${string2slug(child.name.toLowerCase())}`,
          context: {
            id: child.id,
            parentId: id,
            parentIdInt: idInt,
            parentInitials: name,
            parentSlug,
          },
        })
      )
    })
  )
}

exports.createPages = options =>
  Promise.all([createRegionPages].map(f => f(options)))
