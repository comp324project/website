const express = require("express");
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/user");

const router = express.Router();

// Define CRUD routes
router.post("/users", createUser); // Create a user
router.get("/users", getUsers); // Get all users
router.get("/users/:id", getUserById); // Get a specific user by ID
router.put("/users/:id", updateUser); // Update a user by ID
router.delete("/users/:id", deleteUser); // Delete a user by ID

module.exports = router;
