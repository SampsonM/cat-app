import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export const useFetch = <Response>(
  url: string,
  options: any,
  customError?: string,
) => {
  const [response, setResponse] = useState<Response>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const fetchOptions = {
        ...options,
        headers: {
          'x-api-key': 'a9c159b6-bbab-4527-88c9-b01675355642',
          ...options.headers,
        },
      }

      try {
        const res = await fetch(url, fetchOptions)
        const json = await res.json()

        if (res.ok) {
          setResponse(json)
        } else {
          setError(json.message)
        }

        setLoading(false)
        setFetching(false)
      } catch (error) {
        setError('error')
      }
    }

    if (fetching) {
      fetchData()
    }
  }, [fetching])

  return { response, error, loading, setFetching, setError }
}
