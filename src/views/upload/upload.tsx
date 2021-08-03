import React from 'react'
import './upload.css'

interface UploadProps { }

const Upload: React.FC<UploadProps> = ({ }: UploadProps) => {
	return (
		<div data-testid="cat-upload">Upload page</div>
	)
};

export default Upload
