import React from 'react'
import { LogOut,Settings } from 'lucide-react'
import Avatar from '../Avatar'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const SidePanel = () => {

  const {logout,user}  = useAuthStore();


  
  const navigate = useNavigate();

  const handleLogout = async() => {
    await logout();
    navigate('/login');
    toast.success('Logged out successfully');
  }

  return (
    <div className='p-1 max-sm:hidden'>
        <div className='flex flex-col items-center justify-around h-full p-1'>
            <Settings size={30} className='text-white drop-shadow-md hover:text-blue-500 transition-all duration-150 hover:scale-105 cursor-pointer'></Settings>
            <Avatar  img={user?.profilePic}/>
                <LogOut onClick={handleLogout} size={30} className='text-white drop-shadow-md hover:text-blue-500 transition-all duration-150 hover:scale-105 cursor-pointer'></LogOut>
        </div>
    </div>
  )
}

export default SidePanel