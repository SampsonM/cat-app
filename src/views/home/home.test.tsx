import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Home from './home'
import { getCatImagesMock } from '../../__mocks__/data/getCatImagesMock'
import { getVotesMock } from '../../__mocks__/data/getVotesMock'
import fetch from 'jest-fetch-mock'

describe('Home', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should display all received images', async () => {
    fetch.mockResponseOnce(JSON.stringify(getCatImagesMock))
    render(<Home />)

    const expected = await screen.findAllByRole('img', { name: /Cat image /i })

    expect(expected.length).toBe(getCatImagesMock.length)
  })

  it('should format all votes', async () => {
    fetch.mockResponseOnce(JSON.stringify(getCatImagesMock))
    fetch.mockResponseOnce(JSON.stringify(getVotesMock))
    render(<Home />)

    await waitFor(async () => {
      expect(
        await screen.findAllByRole('img', {
          name: /Cat image /i,
        }),
      ).toBeTruthy()
    })

    const cards = await screen.findAllByTestId('cat-card-list-item')
    expect(cards[0]).toHaveTextContent('1')
    expect(cards[1]).toHaveTextContent('8')
    expect(cards[8]).toHaveTextContent('0')
  })
})
