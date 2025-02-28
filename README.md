# 🌐 WebSocket Chat Application (Console-Based)

Welcome to the **WebSocket Chat Application (Console-Based)**! This project demonstrates a simple chat application using WebSockets for real-time communication. The application consists of a WebSocket server and a client that can send and receive messages in real-time via the console.

## 📋 Table of Contents

- [🌐 WebSocket Chat Application (Console-Based)](#-websocket-chat-application-console-based)
  - [📋 Table of Contents](#-table-of-contents)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Run the WebSocket Server](#3-run-the-websocket-server)
    - [4. Run the WebSocket Client](#4-run-the-websocket-client)
  - [💬 Usage](#-usage)
  - [📚 Understanding WebSockets](#-understanding-websockets)
    - [Key Features of WebSockets](#key-features-of-websockets)
  - [🛠️ Project Details](#️-project-details)
    - [Server (`src/server/server.js`)](#server-srcserverserverjs)
    - [Client (`src/client/client.js`)](#client-srcclientclientjs)
  - [🔄 Connection Flow](#-connection-flow)
    - [Single Client Connection](#single-client-connection)
    - [Multiple Clients Connection](#multiple-clients-connection)
  - [📜 License](#-license)

## 📁 Project Structure

```
├── src
│   ├── client
│   │   └── client.js
│   └── server
│       └── server.js
├── package.json
├── yarn.lock
└── README.md
```

## 🚀 Getting Started

Follow these steps to set up and run the WebSocket Chat Application on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/MaryEhb/WebSocket-Chat-Application
cd WebSocket-Chat-Application
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the WebSocket Server

```bash
npm start
```

This command will start the WebSocket server on `ws://localhost:8080`.

### 4. Run the WebSocket Client

Open a new terminal window and run:

```bash
npm run client
```

This command will start the WebSocket client and connect it to the server.

## 💬 Usage

- Once the server is running, you can open multiple instances of the client in different terminal windows.
- Type your messages in the client console and press Enter to send them.
- All connected clients will receive the messages in real-time.
- The server will prompt you to enter your username upon connection, which will be displayed with each message you send.

## 📚 Understanding WebSockets

WebSockets provide a full-duplex communication channel over a single, long-lived connection. This makes them ideal for applications that require real-time data transfer, such as chat applications, online gaming, and live updates.

### Key Features of WebSockets

- **Full-Duplex Communication**: Allows simultaneous two-way communication between the client and server.
- **Low Latency**: Reduces the delay in message delivery compared to traditional HTTP requests.
- **Persistent Connection**: Maintains a single connection for continuous data exchange.

## 🛠️ Project Details

### Server (`src/server/server.js`)

- Uses the `ws` library to create a WebSocket server.
- Manages client connections and broadcasts messages to all connected clients.
- Assigns unique identifiers and colors to clients for easy identification.
- Prompts clients for a username upon connection and notifies other clients when a user joins or leaves.

### Client (`src/client/client.js`)

- Connects to the WebSocket server using the `ws` library.
- Sends user input to the server and displays incoming messages with colored output using the `chalk` library.
- The first message sent by the client is used as the username.

## 🔄 Connection Flow

### Single Client Connection

1. **Client connects to the server:**

```
Client          Server
  |               |
  |---(connect)-->|  Client connects to the WebSocket server.
  |               |
```

*Description*: When a client initiates a connection to the server, the server accepts the connection and establishes a WebSocket session.

2. **Server prompts for username:**

```
Client          Server
  |               |
  |<---(prompt)---|  Server sends a message prompting the client to enter a username.
  |    username   |
  |               |
```

*Description*: Upon successful connection, the server sends a message to the client asking for a username. This is the first interaction between the client and server.

3. **Client sends username:**

```
Client          Server
  |               |
  |---(username)->|  Client sends the username to the server.
  |               |
```

*Description*: The client responds with a username, which the server will use to identify the client in subsequent communications.

4. **Server acknowledges and broadcasts:**

```
Client          Server
  |               |
  |<---(welcome)--|  Server acknowledges the username and sends a welcome message.
  |               |
```

*Description*: The server acknowledges the received username by sending a welcome message to the client.

### Multiple Clients Connection

1. **Client1 is already connected to the server:**

```
Client1         Server
  |               |
  |---(connected)-|  Client1 is already connected to the WebSocket server.
  |               |
```

*Description*: Client1 has already established a WebSocket session with the server.

2. **Another client (Client2) connects to the server:**

```
Client1         Server         Client2
  |               |               |
  |               |<---(connect)--|
  |               |               |
```

*Description*: Client2 initiates a connection to the server, and the server accepts the connection, establishing a WebSocket session.

3. **Server prompts Client2 for username:**

```
Client1         Server         Client2
  |               |               |
  |               |---(prompt)--->|
  |               |    username   |
```

*Description*: The server sends a message to Client2 prompting for a username.

4. **Client2 sends username:**

```
Client1         Server         Client2
  |               |               |
  |               |<--(username)--|
  |               |               |
```

*Description*: Client2 responds with a username, which the server will use to identify Client2 in subsequent communications.

5. **Server acknowledges and broadcasts:**

```
Client1         Server         Client2
  |               |               |
  |<--(broadcast)-|---(welcome)-->|
  |               |               |
  |               |               |
  |               |               |
```

*Description*: The server acknowledges Client2's username by sending a welcome message. It also broadcasts a message to all connected clients to inform them of the new user.

6. **Client2 sends a message:**

```
Client1         Server         Client2
  |               |               |
  |<---(message)--|<--(message)---|
  |               |               |
```

*Description*: Client2 sends a message to the server. The server then broadcasts this message to all connected clients.

In this scenario, the server acknowledges each new client and broadcasts the new user information to all connected clients.

## 📜 License

This project is licensed under the MIT License.

---

Made with ❤️ by Mariem
