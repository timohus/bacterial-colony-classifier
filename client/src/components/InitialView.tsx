import React, {FunctionComponent} from 'react'
import img from 'assets/images/lab.png'



const InitialView: FunctionComponent = () => {
  return (
    <div className="flex flex-col items-center mt-24">
      <div>
        <img src={img} alt="" className="block w-24" />
      </div>
      <div className="mt-12">
        <h3 className="text-blueGray-600">Select image to analyze</h3>
      </div>
      <div className="mt-4">
        <p className="text-center text-blueGray-400">Upload your files or choose from the<br/>pre-loaded images</p>
      </div>
    </div>
  )
}


export default InitialView
