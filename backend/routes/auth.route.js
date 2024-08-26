import express from 'express';

const router = express.Router();

import {login,signup,logout,checkAuth} from "../controllers/auth.controller.js"
import {protectRoute} from '../middleware/auth.middleware.js'

router.get('/checkAuth',protectRoute,checkAuth);

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);


export default router;