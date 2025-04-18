const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env'),debug:false }); // Explicitly specify .env file path and enable debugging
const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri);
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

// export modules
module.exports = { connectDB, disconnectDB };
