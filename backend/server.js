import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';

import connectDB from './db/connectDB.js';


import {app,httpServer} from './socket/socket.js'



// Middleware
app.use(cors({
    origin: 'https://chatty-app-iota.vercel.app', // Only allow requests from this origin
    credentials: true, // Enable cookies
}));
app.options('*', cors());
app.use(express.json()); // Work: Parse JSON bodies (as sent by API clients)
app.use(cookieParser()); // Work: Parse cookies from the request headers

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));


