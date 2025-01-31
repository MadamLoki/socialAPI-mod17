import { Document, Types } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
    friendCount: number;
}

export interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    user: Types.ObjectId;
    username: string;
    reactions: IReaction[];
    reactionCount: number;
}

export interface IReaction {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}