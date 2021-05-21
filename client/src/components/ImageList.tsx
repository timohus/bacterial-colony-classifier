import React, {FunctionComponent} from 'react'
import preloadedImages from 'services/importImages';
import ImageListItem from "./ImageListItem";


type ComponentProps = {
  data: any[],
  onFileSelected: (fileData: any, name: string) => void
}

const ImageList: FunctionComponent<ComponentProps> = ({data, onFileSelected}) => {
  return (
    <div>
      {
        (data && data.length > 0) && (
          <div className="mt-6">
            <h6 className="text-blueGray-500">Your uploads</h6>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {
                data.map((fileData, index) => {
                  return (
                    <ImageListItem
                      key={index}
                      src={URL.createObjectURL(fileData)}
                      name={fileData.name}
                      onClick={(d, name) => onFileSelected(d, name)}
                    />
                  )
                })
              }
            </div>
          </div>
        )
      }

      <div className="mt-6">
        <h6 className="text-blueGray-500">Pre-loaded</h6>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {
            preloadedImages.map((src, index) => {
              return (
                <ImageListItem
                  key={`preloaded-${index}`}
                  src={src}
                  name={`Image_${index + 1}.jpg`}
                  title={src.split("/").pop()}
                  onClick={(d, name) => onFileSelected(d, name)}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}


export default ImageList
