import React from "react"

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
            <td>{region.name}</td>
            <td>{region.Cases}</td>
            <td>{region.Deaths}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
