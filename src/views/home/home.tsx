import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { VoteValue } from '../../components/voteButtons'
import { CatCard } from '../../components/catCard'
import { useFetch } from '../../hooks/useFetch'
import './home.css'

interface HomeProps {}

export interface Image {
  breeds: Array<string>
  id: string
  url: string
  width: Number
  height: Number
  sub_id: string
  created_at: string
  original_filename: string
  breed_ids: Array<string>
}

interface Vote {
  country_code: string
  created_at: string
  id: number
  image_id: string
  sub_id: string
  value: number
}

interface VoteTotals {
  [key: string]: number
}

const Home: React.FC<HomeProps> = () => {
  const [images, setImages] = useState<Image[]>()
  const [voteTotals, setVoteTotals] = useState<VoteTotals>()
  const { response, error, loading, setFetching } = useFetch<Image[]>(
    'https://api.thecatapi.com/v1/images?limit=10',
    { method: 'GET', headers: {} },
  )

  const {
    response: voteResponse,
    error: voteError,
    loading: votesLoading,
    setFetching: setVoteFetching,
  } = useFetch<any>('https://api.thecatapi.com/v1/votes', {
    method: 'GET',
    headers: {},
  })

  const formatVotes = (votes: Vote[]): VoteTotals => {
    return votes.reduce((acc: VoteTotals, { image_id, value }) => {
      if (value === VoteValue.UP) {
        acc[image_id] = acc[image_id] ? acc[image_id] + 1 : 1
      } else if (value === VoteValue.DOWN) {
        acc[image_id] = acc[image_id] ? acc[image_id] - 1 : -1
      }
      return acc
    }, {})
  }

  useEffect(() => {
    if (response) {
      setImages(response)
    }
  }, [response])

  useEffect(() => {
    if (voteResponse) {
      const formattedVoteTotals = formatVotes(voteResponse)
      setVoteTotals(formattedVoteTotals)
    }
  }, [voteResponse])

  useEffect(() => {
    setFetching(true)
    setVoteFetching(true)
  }, [])

  return (
    <div className="cat-home">
      {loading && <div data-testid="cat-home-loader">Loading...</div>}
      {images && (
        <ul className="cat-home__cat-list">
          {images.map((image, index) => (
            <li
              key={`${image.id}-${index}`}
              className="cat-home__cat-list-item"
              data-testid="cat-card-list-item"
            >
              <CatCard image={image} totalVotes={voteTotals?.[image.id] || 0} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home
