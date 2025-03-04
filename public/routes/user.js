const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// Define CRUD routes
router.post("/users", userController.createUser); // Create a user
router.get("/users", userController.getUsers); // Get all users
router.get("/users/:id", userController.getUserById); // Get a specific user by ID
router.put("/users/:id", userController.updateUser); // Update a user by ID
router.delete("/users/:id", userController.deleteUser); // Delete a user by ID

module.exports = router;
