import React, { FormEvent } from 'react'
import './catCard.css'
import type { Image } from 'src/views/home/home'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useEffect } from 'react'
import { VoteButtons } from '../voteButtons'

interface CardProps {
  image: Image
  totalVotes: number
}

const CatCard: React.FC<CardProps> = ({ image, totalVotes }) => {
  const [favourite, setFavourite] = useState(false)
  const [favouriteId, setFavouriteId] = useState(0)

  const url = favourite
    ? `https://api.thecatapi.com/v1/favourites/${favouriteId}`
    : `https://api.thecatapi.com/v1/favourites`
  const method = favourite ? 'DELETE' : 'POST'
  const body = favourite ? null : JSON.stringify({ image_id: image.id })
  const headers = { 'Content-Type': 'application/json' }

  const { response, error, loading, setFetching } = useFetch<{
    message: string
    id: number
  }>(url, { method, body, headers })

  const handleFavouriteClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!loading) {
      setFetching(true)
    }
  }

  useEffect(() => {
    if (response) {
      if (response?.message === 'SUCCESS' && response.id) {
        setFavourite(true)
        setFavouriteId(response.id)
      } else {
        setFavourite(false)
        setFavouriteId(0)
      }
    }
  }, [response])

  return (
    <div className="cat-card">
      <div className="cat-card__img-container">
        <img
          src={image.url || 'https://via.placeholder.com/150'}
          alt={`Cat image ${image.original_filename}`}
          className="cat-card__img"
        />
      </div>

      <div className="cat-card__bottom-bar">
        <button
          className="cat-card__favourite-btn"
          onClick={handleFavouriteClick}
        >
          {favourite ? (
            <>
              <FaHeart data-testid="cat-card-full-heart" /> <p>Un-Favourite</p>
            </>
          ) : (
            <>
              <FaRegHeart data-testid="cat-card-empty-heart" /> <p>Favourite</p>
            </>
          )}
        </button>

        <VoteButtons totalVotes={totalVotes} imageId={image.id} />
      </div>
    </div>
  )
}

export default CatCard
