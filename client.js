const net = require('net');
const client = new net.Socket();

client.connect(9999, '127.0.0.1', () => {
  console.log("🚀 Connected to RPC Server.");

  const request = { functionName: "add", args: [10, 5] };
  client.write(JSON.stringify(request));
});

client.on('data', (data) => {
  const response = JSON.parse(data.toString());
  console.log("📩 Response from server:", response);

  if (response.status === "success") {
    console.log(`✅ Result: ${response.result}`);
  } else {
    console.log(`❌ Error: ${response.message}`);
  }

  client.end();
});

client.on('end', () => {
  console.log("🔌 Disconnected from server.");
});