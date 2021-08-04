import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import Upload from './upload'
import axios from 'axios'

const mockAxios = axios as jest.Mocked<typeof axios>

describe('Upload', () => {
  it('should upload cat image to api', async () => {
    mockAxios.post.mockResolvedValueOnce({
      data: {},
    })

    const file = new File(['test-image'], 'test-image.png', {
      type: 'image/png',
    })

    const { getByTestId } = render(<Upload />)
    const uploader = getByTestId('cat-file-uploader')

    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] },
      }),
    )

    fireEvent.submit(getByTestId('cat-upload-form'))

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
})
