import React, { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import './voteButtons.css'

interface VoteButtonsProps {
  imageId: string
  totalVotes: number
}

export enum VoteValue {
  NO_VOTE = -1,
  DOWN = 0,
  UP = 1,
}

const VoteButtons: React.FC<VoteButtonsProps> = ({ imageId, totalVotes }) => {
  const [votes, setVotes] = useState(0)
  const [vote, setVote] = useState(VoteValue.NO_VOTE)

  const { response, error, loading, setFetching } = useFetch<any>(
    'https://api.thecatapi.com/v1/votes',
    {
      method: 'POST',
      body: JSON.stringify({ image_id: imageId, value: vote }),
      headers: { 'Content-Type': 'application/json' },
    },
  )

  useEffect(() => {
    if (vote === VoteValue.UP || vote === VoteValue.DOWN) {
      setFetching(true)
    }
  }, [vote])

  useEffect(() => {
    setVote(VoteValue.NO_VOTE)
  }, [response])

  return (
    <div className="cat-vote-buttons">
      <button
        className="cat-vote-buttons__button"
        onClick={() => setVote(VoteValue.UP)}
      >
        up +
      </button>
      <p>{totalVotes}</p>
      <button
        className="cat-vote-buttons__button"
        onClick={() => setVote(VoteValue.DOWN)}
      >
        down -
      </button>
    </div>
  )
}

export default VoteButtons
