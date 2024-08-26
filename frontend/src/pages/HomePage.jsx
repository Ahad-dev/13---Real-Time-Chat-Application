import React from 'react'
import SidePanel from '../components/SidePanel/SidePanel'
import UsersPanel from '../components/UserPanel/UserPanel'
import ChatPanel from '../components/ChatPanel/ChatPanel'
import { motion } from 'framer-motion'
const HomePage = () => {
  return (
    

    <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "linear" }}
  className='self-center p-3 backdrop-blur-lg rounded-xl  flex justify-between w-10/12 max-lg:w-full h-[90vh] bg-gray-800/40'>
      <SidePanel></SidePanel>
      <UsersPanel></UsersPanel>
      <ChatPanel></ChatPanel>
    </motion.div>
  )
}

export default HomePage