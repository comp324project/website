require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async (req, res) => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected Successfully');
        res.status(200).json({ message: "MongoDB Connected Successfully" });
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        res.status(500).json({ error: "MongoDB Connection Failed" });
    }
};

// Disconnect from MongoDB
const disconnectDB = async (req, res) => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB Disconnected Successfully');
        res.status(200).json({ message: "MongoDB Disconnected Successfully" });
    } catch (error) {
        console.error('MongoDB Disconnection Error:', error.message);
        res.status(500).json({ error: "MongoDB Disconnection Failed" });
    }
};

module.exports = { connectDB, disconnectDB };
