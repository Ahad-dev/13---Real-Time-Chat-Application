import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
    try{
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },

        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = await Message.create({
            senderId,
            message,
            receiverId,
        })

        //Todo: Socket.io Functionality to emit message to receiver and sender

        if(newMessage){
            conversation.messages.push(newMessage._id);
            await conversation.save();
            res.status(200).json({success:true,message: newMessage});
        }


    }  catch (error) {
        res.status(500).json({success:true,message: error.message});
    }
}

export const getMessages = async (req,res)=>{
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({participants: { $all: [senderId, userToChatId] },}).populate("messages");

        if(conversation){
            res.status(200).json({success:true,messages:conversation.messages});
        }else{
            res.status(200).json({success:true,messages:[]});
        }


    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}