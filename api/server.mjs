import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const APP = process.env.APP || "http://localhost:3000";
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: APP,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id + " connected");

  socket.on("message", (data) => {
    console.log(data);
    socket.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
