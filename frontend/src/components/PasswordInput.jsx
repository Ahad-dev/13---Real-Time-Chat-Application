import React from 'react'
import Input from './Input'
import { Eye,EyeOff } from 'lucide-react'

const PasswordInput = ({icon:Icon,...props}) => {
    const [showPassword,setShowPassword] = React.useState(false)
  return (
    <div className='mb-6 relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className='size-5 text-blue-500'/>
        </div>
        <input
            type={showPassword ? 'text' : 'password'}
            className='w-full pl-10 pr-3 py-2 bg-gray-800 outline-none bg-opacity-50 rounded-lg border border-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition duration-200'
            {...props}
            >
        </input>
        {showPassword ? <EyeOff onClick={()=>setShowPassword(false)} className='absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-blue-500 cursor-pointer'/> : <Eye onClick={()=>setShowPassword(true)} className='absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-blue-500 cursor-pointer'/>}
    </div>
  )
}

export default PasswordInput