import React from 'react'
import { render, waitFor, fireEvent, findByTestId, Query } from '@testing-library/react'
import Upload from './upload'
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom'

const mockAxios = axios as jest.Mocked<typeof axios>
const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Upload', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when an image is successfully uploaded', () => {
    beforeEach(async () => {
      mockAxios.post.mockResolvedValueOnce({ data: {} })

      const file = new File(['test-image'], 'test-image.png', {
        type: 'image/png',
      })

      const { getByTestId } = render(<MemoryRouter><Upload /></MemoryRouter>)

      fireEvent.change(getByTestId('cat-file-uploader'), {
        target: { files: [file] },
      })

      fireEvent.submit(getByTestId('cat-upload-form'))
    })

    it('should upload cat image to api', () => {
      expect(
        mockAxios.post,
      ).toHaveBeenCalledWith(
        'https://api.thecatapi.com/v1/images/upload',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': 'a9c159b6-bbab-4527-88c9-b01675355642',
          },
        },
      )

      // Depending on the level of testing the team feels relevant for the uploading of an
      // image depends on how this part is tested
      // I think the image being successfully uploaded is more suited to an E2E test
      // so have decided against testing the form data structure here
    })

    it('should redirect user to home page', () => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/')
    })
  })

  describe('when an image is NOT successfully uploaded', () => {
    let getByTestId: any
    let findByTestId: any

    beforeEach(() => {
      mockAxios.post.mockRejectedValueOnce(new Error(''))

      const app = render(<MemoryRouter><Upload /></MemoryRouter>)
      getByTestId = app.getByTestId
      findByTestId = app.findByTestId

      fireEvent.change(getByTestId('cat-file-uploader'), {
        target: { files: [] },
      })

      fireEvent.submit(getByTestId('cat-upload-form'))
    })

    it('should display errors returned form API', async () => {
      const error = await findByTestId('cat-upload-form-error')
      expect(error).toBeDefined()
    })
  })
})
