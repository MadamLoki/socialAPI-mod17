import { Request, Response } from 'express';
import { Thought } from '../models/Thought.js';
import { User } from '../models/User.js';
import { Types } from 'mongoose';
import dateFormat from '../utils/dateFormat.js';

const thoughtController = {
    // Get all thoughts
    async getThoughts (_req : Request, res: Response) : Promise<void>  {
        try {
            const thoughts = await Thought.find()
            const formattedThoughts = thoughts.map((thought) => ({ 
                ...thought.toJSON(), 
                createdAt: dateFormat(thought.createdAt),
                reactions: thought.reactions.map(reaction => ({
                    ...reaction,
                    createdAt: dateFormat(reaction.createdAt),
                }))
            }));
            res.json(formattedThoughts);
        } catch (err) {
            res.status(500).json({ 'Error Fetching Thoughts': err});
            return;
        }
    },

    // Get single thought by id
    async getThoughtById(_req: Request, res: Response) : Promise<void>   {
        try {
            const thought = await Thought.findById(_req.params.id)
            if (!thought) {
                res.status(404).json({ message: 'Cannot Find; Thought not found' });
                return;
            }
            const formattedThought = {
                ...thought.toJSON(),
                createdAt: dateFormat(thought.createdAt),
                reactions: thought.reactions.map(reaction => ({
                    ...reaction,
                    createdAt: dateFormat(reaction.createdAt),
                }))
            };
            res.json(formattedThought);
        } catch (err) {
            res.status(500).json({ 'Error Fetching Thought': err});
        }
        
    },

    // Create new thought
    async createThought(req: Request, res: Response) : Promise<void>   {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json({ 'Error Creating Thought': err});
        }
    },
    
    // Update thought by id
    async updateThought(req: Request, res: Response) : Promise<void> {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.id,
                req.body,
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'Cannot Update; Thought not found' });
                return;
            } res.json(thought); 
        } catch (err) {
            res.status(400).json({ 'Error Updating Thought': err});
        }
    },

    // Delete thought by id
    async deleteThought(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
                res.status(404).json({ message: 'Cannot Delete; Thought not found' });
                return;
            }
    
            // Remove thought from user's thoughts array
            await User.findByIdAndUpdate(
                thought.user,
                { $pull: { thoughts: thought._id } }
            );
            await Thought.findByIdAndDelete(thought._id);
            res.json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(500).json({ 'Error Deleting Thought': err});
        }
    },

    async addReaction(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.id,
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            
            if (!thought) {
                res.status(404).json({ message: 'Cannot Add Reaction; Thought not found' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({ 'Error Adding Reaction': err});
        }
    },
    
    async removeReaction(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.id,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            
            if (!thought) {
                res.status(404).json({ message: 'Cannot Remove reaction; Thought not found' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({ 'Error Removing Reaction': err});
        }
    },
    
}

export default thoughtController;