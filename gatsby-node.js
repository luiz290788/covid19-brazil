const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
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
