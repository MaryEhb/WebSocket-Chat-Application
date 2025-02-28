import WebSocket from 'ws';
import chalk from 'chalk';

// Define the WebSocket URL, defaulting to 'ws://localhost:8080' if not set in environment variables
const WS_URL =  process.env.WS_URL || 'ws://localhost:8080';
const ws = new WebSocket(WS_URL);

// Event listener for when the WebSocket connection is opened
ws.on('open', () => {
    console.log(chalk.green('Connected to the server'));
    // Listen for user input from the command line
    process.stdin.on('data', (data) => {
        const message = data.toString().trim();
        // Send the user input as a message to the WebSocket server
        ws.send(JSON.stringify({ message }));
    });
});

// Event listener for when a message is received from the WebSocket server
ws.on('message', (data) => {
    const { message, color } = JSON.parse(data);
    // Log the received message to the console with the specified color
    console.log(chalk[color](message));
});

// Event listener for when the WebSocket connection is closed
ws.on('close', () => {
    console.log(chalk.red('Disconnected from the server'));
});