import React from 'react'
import { Cross, Menu, Search, X } from 'lucide-react'
import UserCard from './UserCard'
import useUsers from '../../hooks/useUsers'
import useConversation from '../../store/useConverstion'


const userPanel = () => {
  const [search,setSearch] = React.useState('');
  const {selectedConversation} = useConversation();
  const {users,loading} = useUsers();
  const [filteredUsers,setFilteredUsers] = React.useState(users);
  console.log(users)

  React.useEffect(()=>{
    setFilteredUsers(users);
  },[users])

  const handelSearch = ()=>{
    //search for user
    if(search.length>0){
      const filtered = users.filter((user)=>user.username.toLowerCase().includes(search.toLowerCase()));
      setFilteredUsers(filtered);
    }
    else{
      setFilteredUsers(users);
    }
  }



  const [open,setOpen] = React.useState(true);
  return (
    <>
    {open?(<X color='white' size={25} className='absolute z-10 m-2 hidden max-sm:flex' onClick={()=>setOpen(false)}></X>):(<Menu size={25} color='white' className='absolute hidden max-sm:flex z-10' onClick={()=>setOpen(true)}></Menu>)}
    <div className={`w-3/12 p-4 bg-white/40 backdrop-blur-lg m-full max-sm:w-56 rounded-lg flex flex-col max-sm:fixed max-sm:${open?"":"hidden"} `}>
        <div className='relative'>
            <input value={search} onChange={({target})=>setSearch(target.value)} type="text" className='pl-3 pr-10 py-4 flex-grow w-full bg-transparent border-b-[1px] border-white/30 outline-none text-white' />
            <Search onClick={handelSearch} size={20} className=' cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 text-white'></Search>
        </div>
        <div className='mt-6'>
          {filteredUsers.map((user)=>(
              <UserCard key={user._id} user={user}/>

          ))}
        </div>
    </div>
    </>

  )
}

export default userPanel