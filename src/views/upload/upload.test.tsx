import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Upload from './upload'
import { MemoryRouter } from 'react-router-dom'
import fetch from 'jest-fetch-mock'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('Upload', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('when an image is successfully uploaded', () => {
    let file: File

    beforeEach(() => {
      fetch.mockResponseOnce(JSON.stringify({ ok: true }))

      file = new File(['test-image'], 'test-image.png', { type: 'image/png' })
    })

    it('should upload cat image to api', async () => {
      render(
        <MemoryRouter>
          <Upload />
        </MemoryRouter>,
      )

      const uploader = await screen.findByTestId('cat-file-uploader')
      fireEvent.change(uploader, { target: { files: [file] } })

      const form = await screen.findByTestId('cat-upload-form')

      fireEvent.submit(form)

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'https://api.thecatapi.com/v1/images/upload',
          {
            body: expect.any(FormData),
            headers: {
              'x-api-key': 'a9c159b6-bbab-4527-88c9-b01675355642',
            },
            method: 'POST',
          },
        )
      })
    })

    it('should redirect user to home page', async () => {
      render(
        <MemoryRouter>
          <Upload />
        </MemoryRouter>,
      )

      const uploader = await screen.findByTestId('cat-file-uploader')
      fireEvent.change(uploader, { target: { files: [file] } })

      const form = await screen.findByTestId('cat-upload-form')

      fireEvent.submit(form)

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith('/')
      })
    })
  })

  describe('when an image is NOT successfully uploaded', () => {
    it('should display correct error when no file selected', async () => {
      render(
        <MemoryRouter>
          <Upload />
        </MemoryRouter>,
      )

      fireEvent.submit(await screen.findByTestId('cat-upload-form'))

      expect(screen.findByText('No image uploaded!')).toBeDefined()
    })

    it('should display correct error when no file selected', async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: 'API error' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })

      render(
        <MemoryRouter>
          <Upload />
        </MemoryRouter>,
      )

      const uploader = await screen.findByTestId('cat-file-uploader')
      fireEvent.change(uploader, { target: { files: [{}] } })

      const form = await screen.findByTestId('cat-upload-form')
      fireEvent.submit(form)

      const error = await screen.findByText('API error')
      expect(error).toBeDefined()
    })
  })
})
