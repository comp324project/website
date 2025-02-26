require('dotenv').config(); // load environment
const mongoose = require('mongoose');

// get db connection thru .env (contact Adri if need .env connection!)
const mongoURI = process.env.MONGO_URI;

console.log("Starting connection to MongoDB...");

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1); // Exit process if connection fails
    } finally {
        mongoose.connection.close();  // Close the connection
        console.log("MongoDB connection closed");
    }
};

// try connection
connectDB();

// export the function to use in other files
module.exports = connectDB;