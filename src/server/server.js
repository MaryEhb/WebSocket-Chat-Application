// Import the WebSocket library
import { WebSocketServer, WebSocket } from 'ws';
// Import the chalk library for colored console output
import chalk from 'chalk';

// Create a new WebSocket server that listens on port 8080
const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

// Create a set to store all connected clients
const clients = new Set();

// Create a counter to assign unique numbers to clients
let clientCounter = 0;

// Function to generate a random color
const getRandomColor = () => {
    const colors = ['red', 'green', 'blue', 'magenta', 'cyan'];
    return colors[Math.floor(Math.random() * colors.length)];
};

// Event listener for new client connections
wss.on('connection', (socket) => {
    // Assign a unique number and color to the new client
    socket.clientNumber = ++clientCounter;
    socket.clientColor = getRandomColor();
    socket.username = ''; // Add username property to socket
    // Add the new client to the set of clients
    clients.add(socket);
    console.log(chalk.yellow(`New client connected: `) + chalk[socket.clientColor](`Client (${socket.clientNumber})`));

    // Prompt the client for a username
    socket.send(JSON.stringify({ message: '(server) Please enter your username:', color: 'yellow' }));

    // Event listener for messages received from a client
    socket.on('message', (data) => {
        const { message } = JSON.parse(data);
        if (!socket.username) {
            // First message is the username
            if (message.trim() === '') {
                // If the username is empty, prompt the user to enter a username again
                socket.send(JSON.stringify({ message: '(server) Username cannot be empty. Please enter your username:', color: 'red' }));
            } else {
                socket.username = message;
                console.log(chalk[socket.clientColor](`(Client ${socket.clientNumber}) set their username to: ${socket.username}`));
                socket.send(JSON.stringify({ message: `(server) Welcome, ${socket.username}!`, color: 'yellow' }));
                // Notify all other clients that a new user has joined
                clients.forEach(client => {
                    if (client !== socket && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ message: `(server) ${socket.username} has joined the chat`, color: 'yellow' }));
                    }
                });
            }
        } else {
            console.log(chalk[socket.clientColor](`(Client ${socket.clientNumber}) ${socket.username}: ${message}`));
            // Broadcast the message to all other connected clients
            clients.forEach(client => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ message: `(Client ${socket.clientNumber}) ${socket.username}: ${message}`, color: socket.clientColor }));
                }
            });
        }
    });

    // Event listener for client disconnections
    socket.on('close', () => {
        // Remove the client from the set of clients
        clients.delete(socket);
        console.log(chalk.red(`(Client ${socket.clientNumber}) ${socket.username} disconnected`));
        // Notify all other clients that a user has left
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ message: `(server) ${socket.username} has left the chat`, color: 'red' }));
            }
        });
    });
});

// Log that the WebSocket server is running and listening for connections
console.log(chalk.yellow('(server) WebSocket server is running on ws://localhost:8080'));