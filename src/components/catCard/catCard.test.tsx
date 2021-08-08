import React from 'react'
import CatCard from './catCard'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { favouriteImage } from '../../__mocks__/data/favouriteImage'
import fetch from 'jest-fetch-mock'
import { act } from 'react-dom/test-utils'

describe('Cat Card', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should allow user to favourite an image', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'SUCCESS', id: 1234 }))

    render(<CatCard totalVotes={10} image={favouriteImage} />)

    const faveBtn = await screen.findByText(/^Favourite/i)
    fireEvent.click(faveBtn)

    const unFavouriteBtn = await screen.findByText(/^Un-Favourite/i)
    const favouriteBtn = await screen.queryByText(/^Favourite/i)

    expect(unFavouriteBtn).toBeInTheDocument()
    expect(favouriteBtn).toBeNull()
  })

  it('should allow user to UN-favourite an image', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'SUCCESS', id: 1234 }))
    fetch.mockResponseOnce(JSON.stringify({ message: 'SUCCESS' }))

    render(<CatCard totalVotes={10} image={favouriteImage} />)

    const faveBtn = await screen.findByText(/^Favourite/i)
    fireEvent.click(faveBtn)

    await waitFor(() => {
      expect(screen.queryByText(/^Favourite/i)).toBeNull
    })

    const unFavouriteBtn = await screen.findByText(/^Un-Favourite/i)
    fireEvent.click(unFavouriteBtn)

    await waitFor(() => {
      expect(screen.queryByText(/^Un-Favourite/i)).toBeNull()
    })
  })
})
