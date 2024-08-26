import React from "react";
import Avatar from "../Avatar";
import MessageCard from "./MessageCard";
import { Loader, SendHorizonal } from "lucide-react";
import useConversation from "../../store/useConverstion";
import useSendMessages from "../../hooks/useSendMessages";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthStore } from "../../store/authStore";
import useListenMessages from "../../hooks/useListenMessages";
import NoSelectedConverstion from '../OnSelectedConvertion'

const ChatPanel = () => {
  const [message, setMessage] = React.useState('');
  const { selectedConversation } = useConversation();
  const { sendMessage, loading } = useSendMessages();
  const { messages, isLoading } = useGetMessages();
  const { user, isCheckingAuth } = useAuthStore();
  const messageContainerRef = React.useRef(null);

  useListenMessages();

  React.useEffect(() => {
    if (messageContainerRef.current) {
      setTimeout(() => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      }, 100); // Adjust this delay if necessary
    }
  }, [messages, selectedConversation]);

  if (!selectedConversation) {
    return isCheckingAuth ? (
      <Loader className="animate-spin size-8"></Loader>
    ) : (
      <NoSelectedConverstion name={user?.fullname}/>
    );
  }

  const handleSend = async () => {
    await sendMessage(message);
    setMessage('');
  };

  return (
    <div className="w-10/12 flex flex-col max-sm:w-full">
      <div className="mt-2 p-5 flex justify-between items-center gap-5 rounded-2xl">
        <div className="flex justify-between items-center gap-5">
          <Avatar img={selectedConversation.profilePic}></Avatar>
          <div>
            <h1 className="text-white w-72 text-xl font-semibold">
              {selectedConversation.fullname}
            </h1>
            <p className="text-white/50">Hey! How are you?</p>
          </div>
        </div>
      </div>

      <div
        className="h-[75%] max-h-[75%] p-2 overflow-y-scroll overflow-x-hidden space-y-2 scroll-m-1"
        ref={messageContainerRef}
      >
        {isLoading ? (
          <Loader className="animate-spin m-auto"></Loader>
        ) : (
          messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message.message}
              come={message.senderId === selectedConversation._id}
              time={message.createdAt}
            ></MessageCard>
          ))
        )}
      </div>

      <div className="flex gap-2 text-white ml-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="p-3 w-10/12 rounded-lg bg-transparent border-2 border-black/20 outline-none"
          placeholder="Enter the Message"
        />
        {!loading ? (
          <button
            onClick={handleSend}
            className="flex justify-center items-center gap-2 bg-blue-600 p-3 rounded-lg"
          >
            Send <SendHorizonal size={20}></SendHorizonal>
          </button>
        ) : (
          <Loader className="animate-spin size-8"></Loader>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;
