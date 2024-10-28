import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();
const PORT = process.env.PORT || 8000;
const APP = process.env.APP || "http://localhost:3000";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: APP,
  },
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("message", (msg) => {
    console.log(`message from ${socket.id}: ${msg}`);
    socket.emit("my message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} and accessible from ${APP}`);
});
