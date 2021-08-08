import App from './App'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

describe('App', () => {
  describe('when /upload view rendered', () => {
    it('should render nav bar', async () => {
      render(
        <MemoryRouter initialEntries={['/upload']} initialIndex={0}>
          <App />
        </MemoryRouter>,
      )

      const nav = await screen.findByTestId('cat-nav')

      expect(nav).toBeDefined()
    })
  })
})
