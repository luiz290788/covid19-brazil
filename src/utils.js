module.exports.string2slug = original => {
  let slug = original.replace(/^\s+|\s+$/g, "").toLowerCase()

  const from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;"
  const to = "aaaaaeeeeiiiioooouuuunc------"

  for (let i = 0, l = from.length; i < l; i++) {
    slug = slug.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  return slug
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
}
