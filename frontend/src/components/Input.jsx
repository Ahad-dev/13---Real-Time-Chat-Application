import React from 'react'

const Input = ({icon:Icon,...props}) => {
  return (
    <div className='mb-6 relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className='size-5 text-blue-500'/>
        </div>
        <input
            className='w-full pl-10 pr-3 py-2 bg-gray-800 outline-none bg-opacity-50 rounded-lg border border-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition duration-200'
            {...props}
            >
        </input>
    </div>
  )
}

export default Input