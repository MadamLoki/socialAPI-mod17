import { Schema, model, Types } from 'mongoose';
import { IThought } from '../routes/index.js';
import { reactionSchema } from './Reaction.js';
import { dateFormat } from '../utils/dateFormat.js';

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

export const Thought = model<IThought>('Thought', thoughtSchema);