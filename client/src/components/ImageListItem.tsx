import React, {FunctionComponent} from 'react'


type ComponentProps = {
  src: any | null,
  name: string,
  onClick: (fileData: any, name: string) => void,
  title?: string,
}


const ImageListItem: FunctionComponent<ComponentProps> = ({src, name, onClick, title}) => {
  return (
    <div
      className="p-2 bg-white rounded-md shadow-sm border-2 border-transparent cursor-pointer
      hover:shadow-xl hover:border-blueGray-600"
      onClick={() => {onClick(src, name)}}
      title={title ? title : name}
    >
      <img
        className="object-cover w-36"
        src={src}
        alt={name}
      />
      <p className="text-sm mt-1 truncate">{name}</p>
    </div>
  )
}


export default ImageListItem
