import React, {FunctionComponent} from 'react'
import {SelectedImage} from "containers/pages/HomePage"
import {CheckCircleIcon} from '@heroicons/react/outline'
import InitialView from "components/InitialView"


type ComponentProps = {
  data: SelectedImage | null,
  isLoading?: boolean
}


const ImageAnalysis: FunctionComponent<ComponentProps> = ({data, isLoading= false}) => {
  return (
    <div>
      {
        (data) ? (
          <div className="flex">
            <div className="flex-1">
              <img src={data.fileData} alt="image to predict" className="rounded-lg"/>
            </div>
            <div className="flex-1 pl-6">
              <div className="font-bold text-blueGray-700 flex items-center h-10">
                <div>
                  {data.predictionStatus === 'finished' && <CheckCircleIcon className="w-8 h-8 text-emerald-500" />}
                  {data.predictionStatus === 'pending' && <div>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  </div>}
                </div>
                <div className="pl-2">
                  {data.name}
                </div>
              </div>

              {
                isLoading ? (
                  <div className="text-blueGray-600 mt-6">
                    Crunching the numbers...
                  </div>
                ) : (
                  <div className="text-blueGray-600 mt-6">
                    <p>Prediction: {data.prediction ? data.prediction.replace('.', ' ') : '-'}</p>
                    <p>Confidence: {data.score ? Math.round(data.score) + '%' : '-'}</p>
                    <p>Result received: {data.predictionDateTime}</p>
                    <p>File Size: {data.fileSize ? Math.round(data.fileSize / 1000) : 0} KB</p>
                  </div>
                )
              }
            </div>
          </div>

        ) : (
          <InitialView/>
        )
      }
    </div>
  )
}


export default ImageAnalysis
