const net = require('net');

// Create a client socket
const client = new net.Socket();

// Connect to RPC server
client.connect(9999, '127.0.0.1', () => {
  console.log("🚀 Connected to RPC Server.");

  // Example: call add(10, 5)
  const request = {
    functionName: "add",
    args: [10, 5]
  };

  // Send JSON request to the server
  client.write(JSON.stringify(request));
});

// When server sends a response
client.on('data', (data) => {
  const response = JSON.parse(data.toString());
  console.log("📩 Response from server:", response);

  if (response.status === "success") {
    console.log(`✅ Result: ${response.result}`);
  } else {
    console.log(`❌ Error: ${response.message}`);
  }

  // Close connection
  client.end();
});

client.on('end', () => {
  console.log("🔌 Disconnected from server.");
});