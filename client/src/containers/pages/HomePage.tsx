import React, {FunctionComponent, useState, useEffect} from 'react'
import FileUpload from "components/FileUpload"
import ImageList from "components/ImageList"
import ImageAnalysis from "components/ImageAnalysis"
import axios from "axios";
import {CameraIcon} from "@heroicons/react/outline";
import ResultsList from "components/ResultsList";


type ComponentProps = {
  data: any | null
}


export type SelectedImage = {
  fileData: string | object | any,
  name?: string,
  predictionStatus: string,
  prediction?: string,
  score?: number,
  predictionDateTime?: string,
  fileSize?: number
}


const HomePage: FunctionComponent<ComponentProps> = ({data}) => {
  const [images, setImages] = useState<any[]>([])
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const addImage = (fileData: any) => {
    setImages([fileData].concat(images))

    const newSelectedImage: SelectedImage = {
      fileData: URL.createObjectURL(fileData),
      name: fileData.name,
      predictionStatus: 'pending',
      prediction: '',
      score: undefined,
      predictionDateTime: undefined,
      fileSize: undefined
    }

    setSelectedImage(newSelectedImage)
  }

  const appendToResults = (image: SelectedImage) => {
    const newResults = [image].concat(results)
    setResults(newResults)
  }

  const updateSelectedImage = (data: any) => {
    if (selectedImage) {

      const newSelectedImage = {
        ...selectedImage,
        prediction: data.prediction,
        score: data.score,
        predictionDateTime: new Date().toLocaleString(),
        predictionStatus: 'finished',
        fileSize: data.fileSize
      }

      setSelectedImage(newSelectedImage)
      appendToResults(newSelectedImage)
    }
  }

  const updateSelectedImageStatus = (status: string) => {
    if (selectedImage) {

      const newSelectedImage = {
        ...selectedImage,
        predictionStatus: status,
      }

      setSelectedImage(newSelectedImage)
    }
  }

  const startAnalysis = (image: SelectedImage) => {
    // Since we are using SRC attribute, we need to load image first
    setAnalysisLoading(true)

    fetch(image.fileData)
      .then(res => res.blob())
      .then(blob => {
        // Create the FormData instance, it is expected by DRF endpoint
        const file = new File([blob], image.name ? image.name : 'image.jpg');
        const formData = new FormData();
        formData.append("file", file);

        // Send the file
        axios.put(
          process.env.REACT_APP_API_URL + '/upload/' + image.name,
          formData,
          {})
          .then(res => {
            if (res.status === 200) {
              // Everything went well, update the results for the SelectedImage
              updateSelectedImage(res.data)
            } else {
              // The server did not return 200, either network or server issue
              console.log('Possibly server error, or network issue', res.status, res)
              setAnalysisLoading(false)
              updateSelectedImageStatus('error')
            }
          })
          .catch((error) => {
            console.error('Error sending file', error)
            updateSelectedImageStatus('error')
          })
          .finally(() => {
            setAnalysisLoading(false)
          })
      })
      .catch((error) => {
        // Was not able to load the image
        console.error('Error loading the image')
        setAnalysisLoading(false)
        updateSelectedImageStatus('error')
      })
  }

  useEffect(() => {
    if (selectedImage !== null && selectedImage.predictionStatus !== 'finished') {
      startAnalysis(selectedImage)
    }
  }, [selectedImage])

  return (
    <div className="flex">
      <div className="w-1/2">
        <div className="p-6">
          <h1 className="text-blueGray-700 text-center">Bacterial culture classifier</h1>

          <div className="mt-12">
            <ImageAnalysis data={selectedImage} isLoading={analysisLoading}/>
          </div>

          {
            results.length > 0 && (
              <div className="mt-12">
                <ResultsList data={results} />
              </div>
            )
          }
        </div>
      </div>

      <aside className="w-1/2 h-screen sticky overflow-y-auto top-0 bg-blueGray-50">
        <div className="p-6 pt-1 relative">
          <div className="sticky top-0 bg-blueGray-50 -ml-6 pl-6 pt-4 pb-4 sticky:bg-black">
            <h4 className="text-blueGray-500">
            <span className="align-middle">
              <CameraIcon className="inline-block w-8 h-8 text-lightBlue-300"/> Images
            </span>
            </h4>
          </div>

          <div className="mt-2">
            <FileUpload
              onFileAdded={(fileData) => {
                addImage(fileData)
              }}
            />
          </div>

          <div>
            <ImageList
              data={images}
              onFileSelected={(fileData, name) => {
                setSelectedImage({fileData, name, predictionStatus: 'pending'})
              }}
            />
          </div>

          {
            analysisLoading && (
              <div className="w-full bg-white bg-opacity-20 cursor-not-allowed absolute top-0 left-0 bottom-0 right-0"/>
            )
          }
        </div>
      </aside>
    </div>
  )
}


export default HomePage
