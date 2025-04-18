const User = require("../models/User");

// Create a new user (POST /users)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).json({ error: "Failed to create user", details: error.message });
    }
};

// Get all users (GET /users)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users", details: error.message });
    }
};

// Get a user by ID (GET /users/:id)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user", details: error.message });
    }
};

// Update a user (PUT /users/:id)
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user", details: error.message });
    }
};

// Delete a user (DELETE /users/:id)
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user", details: error.message });
    }
};

exports.updateResume = async (req, res) => {
    try {
        const userId = req.user._id;
        const content = req.body; // JSON resume content

        const updatedUser = await User.findByIdAndUpdate(
            userId, //Find by user ID
            { masterResume: content },//Update master resume
            { new: true }//retuens the updated schema to updatedUser, we don't need to send back to client
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log("Controller updated resume!: "+updatedUser.masterResume);
        res.status(200).json({
            masterResume: updatedUser.masterResume
        });
    } catch (error) {
        res.status(400).json({ error: "Failed to update master resume", details: error.message });
    }
};

exports.getResume = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ masterResume: user.masterResume });//Return master resume
    } catch (error) {
        res.status(400).json({ error: "Failed to fetch master resume", details: error.message });
    }
};


exports.deleteResume = async (req, res) => {
    try {
        const userId = req.user._id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { masterResume: {} },//Clear resume content
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Master resume deleted (cleared)", masterResume: updatedUser.masterResume });
    } catch (error) {
        res.status(400).json({ error: "Failed to delete master resume", details: error.message });
    }
};
