import express from "express";
import { WebSocketServer } from "ws";
const app = express();
const PORT = 2000;
const server = app.listen(PORT, () => {
    console.log('Server is starting on port', PORT);
});
const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);

    wss.on('message', (data) => {
        const message = `${data}`;
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });


    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

})