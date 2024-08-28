import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from 'cors'

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
     origin: 'https://chatty-app-iota.vercel.app',
  },


});

export const getReceiverUserId = (receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId:socketId}


io.on("connection", (socket) => {
    console.log("a user connected");

    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    socket.on("disconnect", () => {
      console.log("user disconnected");
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})

export {app,io,httpServer}
