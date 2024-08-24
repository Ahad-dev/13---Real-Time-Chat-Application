import express from 'express';

import { getUserForSideBar } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();



router.get('/',protectRoute,getUserForSideBar);


export default router;