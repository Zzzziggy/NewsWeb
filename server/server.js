const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5500 });

wss.on('connection', ws => {
    console.log('Client connected');

    // Send a message to the client every 5 seconds
    const sendInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ news: 'This is a real-time news update!' }));
        }
    }, 5000);

    ws.on('error', (error) => {
        console.log('WebSocket error: ', error);
    });

    ws.on('close', () => {
        clearInterval(sendInterval);
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://127.0.0.1:5500');