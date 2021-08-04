import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import './upload.css'

interface UploadProps {}

const Upload: React.FC<UploadProps> = () => {
  const [imageFile, setImageFile] = useState<File>()

  const handleImageSelect = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const image: File = (target.files as FileList)[0]

    setImageFile(image)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    // TODO: could add debounce here

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
      } catch (err) {
        // TODO: add err handling here
      }
    } else {
      // TODO: add err handling here
    }
  }

  return (
    <div className="cat-upload">
      <form data-testid="cat-upload-form" onSubmit={handleSubmit}>
        <label>
          Cat image:
          <input
            data-testid="cat-file-uploader"
            type="file"
            onChange={handleImageSelect}
          />
        </label>
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
