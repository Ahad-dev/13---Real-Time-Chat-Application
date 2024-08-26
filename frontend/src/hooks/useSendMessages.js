import {useState} from 'react';
import axios from 'axios';
import useConversation from '../store/useConverstion';


const useSendMessages = ()=>{

    const [loading,setLoading]  =useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();

    const sendMessage = async(message)=>{
        setLoading(true);
        const res = await axios.post(`chatty-backend-ruddy.vercel.app/api/messages/send/${selectedConversation._id}`,{message});
        if(res.data.success){
            setMessages([...messages,res.data.message]);
        }
        setLoading(false);

    }

    return {sendMessage,loading}
}

export default useSendMessages;