import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import io from 'socket.io-client'

export const SocketContext = createContext(null);

export const useSocket = ()=>{
    return useContext(SocketContext)
}

export const SocketProvider  = ({children})=>{
    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    const {user} = useAuthStore();

    useEffect(()=>{
        if(user){
            const socket = io('http://localhost:5000',{
                query:{
                    userId:user._id
                }
            });
            setSocket(socket);

            socket.on('getOnlineUsers',(users)=>{
                setOnlineUsers(users)
            })


            return ()=>socket.close();
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
                
    },[user])


    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}
