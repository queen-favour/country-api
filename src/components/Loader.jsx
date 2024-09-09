import React from 'react'
import { FadeLoader } from 'react-spinners'



const Loader = () => {
  return (
    <div className='items-center justify-center flex h-screen '>
        <FadeLoader className="h-10 w-10 text-blue-700 " />
    </div>
  )
}

export default Loader