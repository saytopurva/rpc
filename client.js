const net = require('net');

function callRpc(functionName, args) {
  return new Promise((resolve, reject) => {
    const client = net.createConnection({ host: '127.0.0.1', port: 9999 }, () => {
      const req = { functionName, args };
      client.write(JSON.stringify(req));
    });

    client.on('data', (data) => {
      try {
        const res = JSON.parse(data.toString());
        resolve(res);
      } catch (err) {
        reject(err);
      } finally {
        client.end();
      }
    });

    client.on('error', (err) => reject(err));
  });
}

(async () => {
  try {
    console.log(await callRpc('add', [7, 3]));
    console.log(await callRpc('multiply', [4, 5]));
    console.log(await callRpc('divide', [10, 0]));
    console.log(await callRpc('unknown', [1, 2]));
  } catch (err) {
    console.error('Client error:', err);
  }
})();
