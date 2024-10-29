import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { StreamChat } from "stream-chat";
import { createDatabaseSchema } from "./db.js"; // Import the schema creation function
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID
};

// Load environment variables
dotenv.config();

const app = express();
const api_key = "842k9artxzb2"; // Replace with your Stream API key
const api_secret = "qmv88zpghbgrty3kj9y86vb9tqeghadagn7mmv2mm5gyd3355j3f2ys6z5u3zyva";
const serverClient = StreamChat.getInstance(api_key, api_secret);
const userPool = new CognitoUserPool(poolData);

app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// Create the database schema on server start
createDatabaseSchema();

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

