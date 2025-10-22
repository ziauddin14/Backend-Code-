// import express from "express";
// import { WebSocketServer } from "ws";
// const app = express();
// const PORT = 2000;
// const server = app.listen(PORT, () => {
//     console.log('Server is starting on port', PORT);
// });
// const wss = new WebSocketServer({ server });

// const clients = new Set();

// wss.on('connection', (ws) => {
//     clients.add(ws);

//     wss.on('message', (data) => {
//         const message = `${data}`;
//         clients.forEach((client) => {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });
//     });

//     ws.on('close', () => {
//         clients.delete(ws);
//         console.log('Client disconnected');
//     });

//     ws.on('error', (error) => {
//         console.error('WebSocket error:', error);
//     });

// })

//Socket.io ka server side code 
//on ==> listen
//emit ==> send to all connected clients
//broadcast.emit ==> send to all connected clients except the sender
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const messages = [];
let users = [];

const addUser = (userName, socketId) => {
  users.push({
    userName,
    id: socketId,
    createdAt: Date.now(),
  });
};

const removeUser = (socketId) => {
  const filterUser = users?.filter(({ id }) => id !== socketId);
  users = filterUser;
};

const getUsers = () => users;

const addMessage = (message) => {
  messages.push({
    ...message,
    timeStamp: Date.now(),
  });
};

// on Listening Event
// emit Sends to only that specific clients
// socket.broadcast.emit() → Sends to all except the sender

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    const { username } = data;

    if (!username) {
      socket.emit("error", { message: "Username is required" });
      return;
    }

    const existingUser = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
      socket.emit("error", { message: "Username is already taken" });
      return;
    }

    addUser(socket.id, username.trim());

    socket.emit("joined", {
      message: `Welcome to the chat, ${username}!`,
      users: getUsers(),
      recentMessages: messages.slice(-20),
    });

    socket.broadcast.emit("userJoined", {
      message: `${username} joined the chat`,
      users: getUsers(),
    });
  });

  socket.on("sendMessage", (data) => {
    const user = users.find((u) => u.id === socket.id);

    if (!user) {
      socket.emit("error", { message: "You must join first" });
      return;
    }

    const { message } = data;

    if (!message || message.trim() === "") {
      socket.emit("error", { message: "Message cannot be empty" });
      return;
    }

    const newMessage = {
      username: user.username,
      message: message.trim(),
      socketId: socket.id,
    };

    addMessage(newMessage);

    socket.emit("newMessage", {
      ...newMessage,
      timeStamp: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
