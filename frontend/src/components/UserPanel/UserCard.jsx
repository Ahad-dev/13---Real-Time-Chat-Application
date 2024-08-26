import React from 'react'
import Avatar from '../Avatar'
import useConversation from '../../store/useConverstion'
import { useSocket } from '../../context/SocketContext';
import { motion } from 'framer-motion'

const UserCard = ({user}) => {
  const {selectedConversation,setSelectedConversation} = useConversation();

  const isSelected = selectedConversation?._id === user._id;

  const {onlineUsers} = useSocket();
  const isOnline = onlineUsers.includes(user._id);
  

  const handleCardClick =()=>{
    setSelectedConversation(user);
  }
  return (
        <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 ,delay:0.5}}

        className={`relative mt-3 min-w-48 flex px-4 py-3 items-center ${isOnline&&"justify-between"} rounded-lg shadow-md hover:bg-blue-600/40 cursor-pointer ${isSelected?"bg-blue-600/40":"bg-black/30 "}`} onClick={handleCardClick}>
            <Avatar img={user.profilePic} />
                <span className='text-white ml-5 font-semibold'>{user.fullname}</span>
              {isOnline&&<div className=' p-1 bg-green-500 rounded-full top-0 right-0'></div>}

        </motion.div>
  )
}
export default UserCard