import React from 'react'

const Avatar = ({img}) => {
  return (
    <div className='flex items-center justify-center relative '>
      <img src={img} alt='avatar' className='max-w-14 max-h-14 bg-green-500 rounded-full'/>
    </div>    
)
}

export default Avatar