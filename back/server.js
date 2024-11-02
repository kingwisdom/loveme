import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./router/authRoute.js";
import usersRoute from "./router/usersRoute.js";
import matchRoute from "./router/matchRoute.js";
import messageRoute from "./router/messageRoute.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import path from "path";
import { createServer } from "http";
import { initializeSocket } from "./socket/socket.server.js";


dotenv.config()
const app = express();

const httpServer = createServer(app);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

initializeSocket(httpServer);

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/match", matchRoute);
app.use("/api/messages", messageRoute);


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});