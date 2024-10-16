import { Router } from "express";
import authRoutes from './auth/index.js';
import gamesRoutes from './games/index.js';

const router = Router();

router.use(authRoutes);
router.use(gamesRoutes);


export default router;