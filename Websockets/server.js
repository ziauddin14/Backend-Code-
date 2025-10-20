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
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
        methods: [ "GET", "POST"],
        origin: ["http://localhost:5173"],
        credentials: true
    }
});
let users = [];
const messages = [];
const addUser = (username, socketId) => {
    users.push({ username, id: socketId, createdAt: new Date.now() });
    
}

const removeUser = (socketId) => {
    const filteredUsers = users.filter((user) => user.socketId !== socketId);
    users = filteredUsers;
}
const getUser = () => users;

const addMessage = (message) => {
    messages.push({...message, timeStamp: new Date.now()});
}
io.on('connection', (socket) => {
    socket.on('join', (data) => {
        const { username } = data;
        //Validation
        if (!username) return 'Username is required';
        //Check for duplication
        const isUserExists = users.find((user) => user.username === username);
        if (isUserExists)   return 'Username is already taken';
        //Add user
        addUser(username, socket.id);
        socket.emit('welcome', { message: `Welcome to the chat, ${username}`, users: getUser(),  });
        socket.broadcast.emit('userJoined', { message: `${username} has joined the chat`, users: getUser() });
    });
    //Send message
    socket.on('message', (data) => {
        const {username} = data;
        const user = users.find((user) => user.username === username);
        if(!user) return 'Please join the chat to send messages';
        const objectMessage = {
            ...messages,
            username,
            id: socket.id,
        }
        addMessage(objectMessage);
        io.broadcast.emit('message', objectMessage);
    });
});

const PORT = 2000;
httpServer.listen(PORT, () => {
    console.log('Server is starting on port', PORT);
});

//on ==> listen
//emit ==> send to all connected clients
//broadcast.emit ==> send to all connected clients except the sender