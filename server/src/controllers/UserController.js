// controllers/UserController.js
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import { StreamChat } from "stream-chat";

// Initialize StreamChat instance
const api_key = "your_api_key_here";
const api_secret = "your_api_secret_here";
const serverClient = StreamChat.getInstance(api_key, api_secret);

export async function signup(req, res) {
  try {
    const { username, password, firstName, lastName } = req.body;

    // Check if the user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const newUser = await User.create({ userId, username, hashedPassword, firstName, lastName });

    // Generate a token using StreamChat
    const token = serverClient.createToken(userId);

    res.status(201).json({
      message: "User created successfully",
      user: { userId, username, firstName, lastName },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during signup." });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findByUsername(username);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) return res.status(401).json({ message: "Incorrect password" });

    // Generate a token
    const token = serverClient.createToken(user.userId);

    res.json({
      message: "Login successful",
      user: { userId: user.userId, username, firstName: user.firstName, lastName: user.lastName },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login." });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve users." });
  }
}
