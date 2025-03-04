require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
};

// Disconnect from MongoDB
const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.error('MongoDB Disconnection Error:', error.message);
    }
};

module.exports = { connectDB, disconnectDB };
