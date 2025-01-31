import express from 'express';
import userRoutes from './userRoutes.js';
import friendRoutes from './friendRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/users', friendRoutes)
router.use('/thoughts', thoughtRoutes);

export default router;