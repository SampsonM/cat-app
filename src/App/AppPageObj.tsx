import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import App from './App'
import { MemoryRouter } from 'react-router-dom'

interface Options {
  initialEntries: string[]
}

export default class AppPO {
  app: RenderResult

  constructor(options: Options) {
    this.app = render(
      <MemoryRouter initialEntries={options.initialEntries} initialIndex={0}>
        <App />
      </MemoryRouter>
    )
  }

  async getNav(): Promise<HTMLElement> {
    return await this.app.findByTestId('cat-nav')
  }
}
