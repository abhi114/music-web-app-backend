import {Router} from 'express';
import { User } from '../models/user.model.js';
import { authCallback } from '../controllers/auth.controller.js';
const router = Router();

router.get("/callback", authCallback);

export default router;