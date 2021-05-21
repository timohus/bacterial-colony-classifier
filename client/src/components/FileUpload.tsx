import React, {FunctionComponent} from 'react'
import {useDropzone} from 'react-dropzone'
import { DocumentDownloadIcon } from '@heroicons/react/outline'


type ComponentProps = {
  onFileAdded: (fileData: any) => void,
}


const FileUpload: FunctionComponent<ComponentProps> = ({onFileAdded}) => {
  const onDrop = (acceptedFiles: any[]) => {
    onFileAdded(acceptedFiles[0])
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false
  })

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className="p-6 border-2 border-dashed rounded-2xl w-full bg-blueGray-100 cursor-pointer"
      >
        <input {...getInputProps()} />

        <div className="text-center space-y-6">
          <DocumentDownloadIcon className="inline-block h-12 w-12 text-blueGray-300"/>
          <p className="text-blueGray-500">
            {
              isDragActive ? (
                <span>Drop the file here ...</span>
              ) : (
                <span>Drag & drop an image here,<br/>or click to select a file</span>
              )
            }
          </p>
        </div>
      </div>
    </div>
  )
}


export default FileUpload
