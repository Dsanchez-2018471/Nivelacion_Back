import { config } from "dotenv";
import ExpressServer from "./configs/server.js";
import { connectDB } from "./configs/db.js";


config();
const server = new ExpressServer();
server.listen();
connectDB();  // Connect to MongoDB after server is listening
server.start(); // Start server after connecting to MongoDB
