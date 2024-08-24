import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';

import connectDB from './db/connectDB.js';


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Work: Parse JSON bodies (as sent by API clients)
app.use(cookieParser()); // Work: Parse cookies from the request headers

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));


