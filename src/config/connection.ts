import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
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

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Log once we're connected
db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});

// Handle process termination
process.on('SIGINT', async () => {
    await db.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
});

export default db;