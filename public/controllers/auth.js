const User = require("../models/User");
const bcrypt = require("bcrypt");

// Example User Registration using User schema
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // We are gonna have to encrypt passwords
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Creates new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
};
