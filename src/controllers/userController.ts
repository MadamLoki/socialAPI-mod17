import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { Thought } from '../models/Thought.js';
import { Types } from 'mongoose';

export const userController = {
        // Get all users
    async getUsers(_req: Request, res: Response) {
        try {
            const users = await User.find()
                .populate('thoughts')
                .populate('friends');
            res.json(users);
        } catch (err) {
            }
        },
        // Get single user by id
    async getUserById(_req: Request, res: Response): Promise<Response | void> {
        try {
            const user = await User.findById(_req.params.id)
            .populate('thoughts')
            .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(User);
        } catch (err) {
            res.status(500).json({ 'Error Fetching User': err});
        }
    },

    // Create new user
    async createUser (_req : Request, res: Response): Promise<void> {
        try {
            const user = await User.create(_req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ 'Error Creating User': err});
        }
    },

    // Update user by id
    async updateUser (_req : Request, res: Response): Promise<Response | void> {
        try {
            const user = await User.findByIdAndUpdate(
                _req.params.id,
                _req.body,
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            } res.json(user); 
        } catch (err) {
            res.status(400).json({ 'Error Updating User': err});
        }
    },

    // Delete user by id
    async deleteUser (_req : Request, res: Response): Promise<Response | void> {
        try {
            const user = await User.findById(_req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Remove user's thoughts
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            // Remove user
            await User.findByIdAndDelete(_req.params.id);
            res.json({ message: 'User and associated thoughts deleted' });
        } catch (err) {
            res.status(500).json({ 'Error Deleting User': err});
        }
    },
    // Add friend
    async addFriend(_req: Request, res: Response): Promise<Response | void> {
        try {
            if (!Types.ObjectId.isValid(_req.params.userId) || !Types.ObjectId.isValid(_req.params.friendId)) {
                return res.status(400).json({ message: 'Invalid user or friend ID' });
            }
    
            const user = await User.findByIdAndUpdate(
                _req.params.userId,
                { $addToSet: { friends: _req.params.friendId } },
                { runValidators: true, new: true }
            ).populate('friends');
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.json(user);
        } catch (err) {
            res.status(500).json({ 'Error Adding Friend': err});
        }
    },

    // Remove friend
    async removeFriend(_req: Request, res: Response): Promise<Response | void> {
        try {
            if (!Types.ObjectId.isValid(_req.params.userId) || !Types.ObjectId.isValid(_req.params.friendId)) {
                return res.status(400).json({ message: 'Invalid user or friend ID' });
            }
    
            const user = await User.findByIdAndUpdate(
                _req.params.userId,
                { $pull: { friends: _req.params.friendId } },
                { runValidators: true, new: true }
            ).populate('friends');
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.json(user);
        } catch (err) {
            res.status(500).json({ 'Error Removing Friend': err});
        }
    }
}

export default userController;
