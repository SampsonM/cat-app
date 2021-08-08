import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import VoteButtons from './voteButtons'
import fetch from 'jest-fetch-mock'

describe('Vote buttons', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should increment vote when Up vote button clicked', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'SUCCESS', id: 12345 }))

    render(<VoteButtons totalVotes={10} imageId={'98765'} />)

    const upVoteBtn = await screen.findByRole('button', { name: /up \+/i })

    fireEvent.click(upVoteBtn)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/votes', {
        method: 'POST',
        body: JSON.stringify({ image_id: '98765', value: 1 }),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'a9c159b6-bbab-4527-88c9-b01675355642',
        },
      })
    })
  })

  it('should decrement vote when Down vote button clicked', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'SUCCESS', id: 12345 }))

    render(<VoteButtons totalVotes={10} imageId={'98765'} />)

    const downVoteBtn = await screen.findByRole('button', { name: /down \-/i })

    fireEvent.click(downVoteBtn)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/votes', {
        method: 'POST',
        body: JSON.stringify({ image_id: '98765', value: 0 }),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'a9c159b6-bbab-4527-88c9-b01675355642',
        },
      })
    })
  })

  it('should render totalVotes correctly', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'SUCCESS', id: 12345 }))

    render(<VoteButtons totalVotes={10} imageId={'98765'} />)

    const totalVotes = await screen.findByText('10')

    expect(totalVotes).toBeInTheDocument()
  })
})
