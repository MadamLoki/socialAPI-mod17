import express from 'express';
import { userController } from '../../controllers/userController.js';

const router = express.Router();

router.route('/:userId/friends/:friendId')
    .post(async (req, res, next) => {
        try {
            await userController.addFriend(req, res, next);
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            await userController.removeFriend(req, res);
        } catch (err) {
            next(err);
        }
    });

export default router;