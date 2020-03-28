import React from "react"
import { Link } from "gatsby"

export const RegionList = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Estado</td>
          <td># Casos</td>
          <td># Mortes</td>
        </tr>
      </thead>
      <tbody>
        {data.map(region => (
          <tr>
            <td>
              <Link to={`/${region.name.toLowerCase()}/`}>{region.name}</Link>
            </td>
            <td>{region.Cases}</td>
            <td>{region.Deaths}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
