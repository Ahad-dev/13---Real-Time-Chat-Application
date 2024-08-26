import { useEffect } from "react";
import { useSocket } from "../context/SocketContext"
import useConversation from '../store/useConverstion'

const useListenMessages = ()=>{
    const {socket} = useSocket();
    const {messages,setMessages} = useConversation()

    console.log(messages)
    useEffect(()=>{
        if(socket){
            socket.on('newMessage',(message)=>{
                setMessages([...messages,message])
            })
        }
        return ()=>{
            if(socket){
                socket.off('newMessage')
            }
        }
    },[socket,setMessages,messages])

    
}

export default useListenMessages;