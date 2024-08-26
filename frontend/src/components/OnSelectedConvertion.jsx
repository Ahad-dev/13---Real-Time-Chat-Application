import React from 'react'
import { motion } from 'framer-motion'

const OnSelectedConvertion = ({name}) => {
  return (
    <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "linear" ,delay:0.5}}
    className='w-10/12 flex flex-col justify-center item-center text-center'>
        <p className='text-3xl font-semibold text-white'>Welcome, {name} 👋 </p>
        <h1 className='text-white text-2xl'>Select a conversation to start chatting</h1>

    </motion.div>
  )
}

export default OnSelectedConvertion