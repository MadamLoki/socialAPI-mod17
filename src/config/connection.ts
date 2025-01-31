import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB';

// Connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});

process.on('SIGINT', async () => {
    await db.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
});

export default db;