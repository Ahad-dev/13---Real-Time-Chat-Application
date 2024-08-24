import express from 'express';
const router = express.Router();
import { sendMessage,getMessages } from '../controllers/message.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';

router.post('/send/:id',protectRoute, sendMessage);

router.get('/:id',protectRoute, getMessages);




export default router;