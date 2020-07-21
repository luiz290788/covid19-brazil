import { useState, useEffect } from "react"
export const useCovidData = (filename) => {
  const [{ data, loading }, setData] = useState({ data: undefined, loading: true })
  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/luiz290788/covid19-brazil-data/master/data/${filename}.json`)
      .then(resp => resp.json())
      .then(data => setData({ data, loading: false }))
  }, [filename])
  return { data, loading }
}

