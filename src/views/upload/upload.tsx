import axios from 'axios'
import React, { FormEvent, useState, useEffect, useRef } from 'react'
import { act } from 'react-dom/test-utils'
import { useHistory } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import './upload.css'

interface UploadProps {}

const Upload: React.FC<UploadProps> = () => {
  const [formData, setFormData] = useState<FormData>()
  const history = useHistory()

  const { response, error, loading, setFetching, setError } = useFetch<any>(
    'https://api.thecatapi.com/v1/images/upload',
    { method: 'POST', body: formData, headers: {} },
  )

  const handleImageSelect = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement

    if (target?.files?.[0]) {
      setError('')
      const formData = new FormData()
      formData.append('file', target.files[0])
      setFormData(formData)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (formData) {
      setFetching(true)
    } else {
      setError('Error: No image uploaded!')
    }
  }

  useEffect(() => {
    if (response) {
      history.push('/')
    }
  }, [response])

  return (
    <div className="cat-upload">
      <form
        noValidate
        data-testid="cat-upload-form"
        className="cat-upload__form"
        onSubmit={handleSubmit}
      >
        <label className="cat-upload__file-label">
          Cat image:
          <input
            className="cat-upload__file-input"
            data-testid="cat-file-uploader"
            type="file"
            onChange={handleImageSelect}
          />
        </label>

        {error && (
          <div
            aria-live="polite"
            className="cat-upload__form-error"
            data-testid="cat-upload-form-error"
          >
            {error}
          </div>
        )}

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
