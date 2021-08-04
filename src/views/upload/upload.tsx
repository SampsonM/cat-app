import axios from 'axios'
import React, { FormEvent, useState, useEffect, useRef } from 'react'
import { act } from 'react-dom/test-utils'
import { useHistory } from 'react-router-dom'
import './upload.css'

interface UploadProps { }

const Upload: React.FC<UploadProps> = () => {
  const [imageFile, setImageFile] = useState<string | Blob>()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const isMounted = useRef(false);
  const history = useHistory()

  const handleImageSelect = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const image: File = (target.files as FileList)[0]

    setImageFile(image)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
  }

  useEffect(() => {
    async function postImage() {
      if (imageFile) {
        try {
          const formData = new FormData()
          formData.append('file', imageFile)

          await axios.post(
            'https://api.thecatapi.com/v1/images/upload',
            formData,
            {
              headers: {
                'x-api-key': 'a9c159b6-bbab-4527-88c9-b01675355642',
                'Content-Type': 'multipart/form-data',
              },
            },
          )

          history.push('/')
        } catch (err) {
          act(() => setError(true))
        }
      } else {
        act(() => setError(true))
      }
    }

    if (isMounted.current) {
      postImage();
    } else {
      isMounted.current = true
    }
  }, [submitting]);

  return (
    <div className="cat-upload">
      <form data-testid="cat-upload-form" className="cat-upload__form" onSubmit={handleSubmit}>
        <label className="cat-upload__file-label">
          Cat image:
          <input
            className="cat-upload__file-input"
            data-testid="cat-file-uploader"
            type="file"
            onChange={handleImageSelect}
          />
        </label>

        {error && <div data-testid="cat-upload-form-error">Error</div>}

        <input
          data-testid="cat-upload-submit-btn"
          className="cat-upload__submit"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  )
}

export default Upload
