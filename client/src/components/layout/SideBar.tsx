import React, {FunctionComponent} from 'react'
import {
  Link
} from "react-router-dom"
import logo from 'assets/images/petri-dish-4.png';
import {HomeIcon, AcademicCapIcon, InformationCircleIcon} from '@heroicons/react/solid';


const SideBar: FunctionComponent = () => {
  return (
    <div className="h-screen bg-blueGray-800 text-white p-4">
      <div>
        <Link to={'/'}>
          <img src={logo} alt="" className="block w-12" />
        </Link>
      </div>

      <div className="flex flex-col items-center mt-12 space-y-6">
        <div>
          <Link to={'/'} className="block w-8 h-8 rounded-lg p-1 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg
          border border-blueGray-800 hover:border-white">
            <HomeIcon className="w-f h-f text-lightBlue-200" />
          </Link>
        </div>

        <div>
          <Link to={'/about'} className="block w-8 h-8 rounded-lg p-1 bg-gradient-to-r from-orange-600 to-pink-800 shadow-lg
          border border-blueGray-800 hover:border-white">
            <InformationCircleIcon className="w-f h-f text-red-200" />
          </Link>
        </div>
      </div>
    </div>
  )
}


export default SideBar
