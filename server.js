const net = require('net');

// Define the remote functions that can be called by the client
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b !== 0 ? a / b : "Error: Division by zero";
}

// Function map
const functions = { add, subtract, multiply, divide };

// Create a TCP server
const server = net.createServer((socket) => {
  console.log("✅ Client connected.");

  // When data is received from client
  socket.on('data', (data) => {
    try {
      const request = JSON.parse(data.toString());
      const { functionName, args } = request;

      console.log("📩 Request received:", request);

      if (functions[functionName]) {
        const result = functions[functionName](...args);
        const response = { status: "success", result };
        socket.write(JSON.stringify(response));
      } else {
        const response = { status: "error", message: "Function not found" };
        socket.write(JSON.stringify(response));
      }
    } catch (error) {
      const response = { status: "error", message: "Invalid request format" };
      socket.write(JSON.stringify(response));
    }
  });

  // When client disconnects
  socket.on('end', () => {
    console.log("❌ Client disconnected.");
  });
});

// Server listens on port 9999
server.listen(9999, '127.0.0.1', () => {
  console.log("🚀 RPC Server running on 127.0.0.1:9999");
});
