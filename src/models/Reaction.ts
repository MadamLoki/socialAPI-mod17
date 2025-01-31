import { Schema, Types } from 'mongoose';
import { IReaction } from '../routes/index.js';

export const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: () => new Date()
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);