import express from 'express';
import { userController } from '../../controllers/userController.js';

const router = express.Router();

// Add friend to user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    await userController.addFriend(req, res) });

// Remove friend from user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    await userController.removeFriend(req, res)}
);

export default router;