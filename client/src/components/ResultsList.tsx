import React, {FunctionComponent} from 'react'
import {SelectedImage} from "containers/pages/HomePage";


type ComponentProps = {
  data: SelectedImage[]
}


const ResultsList: FunctionComponent<ComponentProps> = ({data}) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 pb-12">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow-xl overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prediction
                  </th>
                  {/*<th scope="col"*/}
                  {/*    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
                  {/*  Time*/}
                  {/*</th>*/}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                {
                  data.map((image, index) => {
                    return (
                      <tr key={index} className="hover:bg-lightBlue-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full"
                                   src={image.fileData}
                                   alt=""/>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {image.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {image.predictionDateTime}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{image.prediction ? image.prediction.replace('.', ' ') : '-'}</div>
                          <div className="text-xs text-gray-400">Confidence: {image.score ? Math.round(image.score) + '%' : '-'}</div>
                        </td>

                        {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">*/}
                        {/*  {image.predictionDateTime}*/}
                        {/*</td>*/}
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ResultsList
