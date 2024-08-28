import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../store/useConverstion";

const useGetMessages = () => {
  const [isLoading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://chatty-backend-gold.vercel.app/api/messages/${selectedConversation._id}`
      );
      if (res.data.success) {
        setMessages(res.data.messages);
      }
      setLoading(false);
    };
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id])
    return { isLoading, messages };
};

export default useGetMessages;
